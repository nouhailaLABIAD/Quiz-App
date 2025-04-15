
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
    @IsNotEmpty({ message: 'Le nom est obligatoire' })
    nom: string;

    @IsNotEmpty({ message: 'Le prénom est obligatoire' })
    prenom: string;

    @IsEmail({}, { message: 'Email invalide' })
    email: string;

    @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
    password: string;
}
