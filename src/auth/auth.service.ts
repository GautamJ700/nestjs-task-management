import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-cred.dto';
import { UserRepository } from './users.repository';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

 signUp(AuthCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.createUser(AuthCredentialDto);
  }
}
