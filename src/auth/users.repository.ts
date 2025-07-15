import { Injectable } from '@nestjs/common';
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
    const { username, password } = authCredentials

    const user = this.create({ username, password });
    await this.save(user);

  }
}