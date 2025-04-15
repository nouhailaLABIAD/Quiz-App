import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from 'src/auth/schemas/user.shema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findAll() {
        return this.userModel.find().select('-password').exec();
    }
    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).select('-password');
        if (!user) throw new NotFoundException('Utilisateur non trouvé');
        return user;
      }
  
      async create(data: Partial<User>): Promise<User> {
        const created = new this.userModel(data);
        return created.save();
      }
    
      async update(id: string, data: Partial<User>): Promise<User> {
        const updated = await this.userModel.findByIdAndUpdate(id, data, { new: true });
        if (!updated) throw new NotFoundException('Utilisateur non trouvé');
        return updated;
      }
    
      async remove(id: string): Promise<void> {
        const deleted = await this.userModel.findByIdAndDelete(id);
        if (!deleted) throw new NotFoundException('Utilisateur non trouvé');
      }
}
