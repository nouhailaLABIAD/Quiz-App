// src/quiz/quiz.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { QuizSchema } from './schemas/quiz.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Quiz', schema: QuizSchema }]), // ici on lie le modèle Quiz avec le schema
  ],
  providers: [QuizService],
  controllers: [QuizController],
})
export class QuizModule {}
