// src/questions/questions.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './interfaces/question.interface';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(@InjectModel('Question') private readonly questionModel: Model<Question>) {}

 
  
  async findByQuiz(quizId: string) {
    return this.questionModel.find({ quizId });
  }
  
  async remove(id: string) {
    return this.questionModel.findByIdAndDelete(id);
  }
  
  async create(dto: CreateQuestionDto) {
    if (!dto.choices.includes(dto.correctAnswer)) {
      throw new Error('La bonne réponse doit faire partie des choix proposés.');
    }
    const question = new this.questionModel(dto);
    return question.save();
  }
  
  async update(id: string, dto: UpdateQuestionDto) {
    try {
      if (!dto.choices.includes(dto.correctAnswer)) {
        throw new Error('La bonne réponse doit faire partie des choix proposés.');
      }
      return await this.questionModel.findByIdAndUpdate(id, dto, { new: true });
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de la question: ${error.message}`);
    }
  }
  
  
  
  
}
