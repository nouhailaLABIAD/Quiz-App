
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {


    @IsEmail({}, { message: 'Email invalide' })
    email: string;

    @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
    password: string;
}
