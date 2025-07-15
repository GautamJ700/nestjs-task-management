import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-cred.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}
    
    @Post('signup')
    async signUp(@Body() authCredentialsDto: AuthCredentialDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }
}
