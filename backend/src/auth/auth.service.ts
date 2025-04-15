import { LoginDto } from './dto/login.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.shema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(
         @InjectModel(User.name)
         private userModel:Model<UserDocument>,
         private  jwtService: JwtService,
    ){}
    //inscription
    async signUp(signUpDto:SignupDto):Promise<{token:string}>{
        const {nom,prenom,email,password}=signUpDto;
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await this.userModel.create({
            nom,
            prenom,
            email,
            password:hashedPassword,
            role:'user'
        });
        const token=this.jwtService.sign({
            id:user._id,
            role: user.role // Nécessaire pour votre logique de redirection
        });
        return {token};
    }
    //login
    async login(loginDto:LoginDto):Promise<{token:string}>{
        const {email,password}=loginDto;

        const user=await this.userModel.findOne({email});
        if(!user){
            throw new Error('email ou mot de passe invalide !');
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            throw new Error('email ou mot de passe invalide !');
        }
        const token=this.jwtService.sign({
            id:user._id,
            role: user.role,  

        });
        return {token};
    }
}

