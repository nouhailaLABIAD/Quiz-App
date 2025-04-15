// src/questions/questions.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './interfaces/question.interface';

@Injectable()
export class QuestionService {
  constructor(@InjectModel('Question') private readonly questionModel: Model<Question>) {}

  async createQuestion(createQuestionDto): Promise<Question> {
    const createdQuestion = new this.questionModel(createQuestionDto);
    return await createdQuestion.save();
  }

  async findAll(): Promise<Question[]> {
    return await this.questionModel.find().exec();
  }
  
}
