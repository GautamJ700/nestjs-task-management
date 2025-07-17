import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-cred.dto';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
      super(User, dataSource.createEntityManager());
    }
  

  async createUser(authCredentials: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentials;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password :hashedPassword});
    try {
      await this.save(user);
      
    } catch (error) {
      if
        (error.code === '23505') { // duplicate usename
          throw new ConflictException('Username already exists');
        } else {
          throw new InternalServerErrorException();
        }    
    }
    

  }
}