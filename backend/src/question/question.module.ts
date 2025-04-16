// src/questions/question.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuestionSchema } from './schemas/question.schema';


@Module({
  imports: [
    // Enregistrement des modèles Question et Reponse
    MongooseModule.forFeature([
      { name: 'Question', schema: QuestionSchema },
    ]),
  ],
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
