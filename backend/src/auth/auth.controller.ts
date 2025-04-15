import { AuthService } from './auth.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}


    @Post('/signup')
     async signUp(@Body() signUpDto:SignupDto):Promise<{token:string}>{
        return this.authService.signUp(signUpDto);
    }
    @Post('login')
async login(@Body() loginDto: LoginDto) {
  try {
    const result = await this.authService.login(loginDto);
    console.log('Connexion réussie pour:', loginDto.email); // Backend Log
    return result;
  } catch (error) {
    console.error('Erreur de connexion:', error.message);
    throw error;
  }
}
}
