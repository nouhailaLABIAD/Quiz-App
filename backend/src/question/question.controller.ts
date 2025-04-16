// src/questions/questions.controller.ts
import { Controller, Post, Body, Delete, Get, Param, Put } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionsService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

@Get('quiz/:quizId')
findByQuiz(@Param('quizId') quizId: string) {
  return this.questionsService.findByQuiz(quizId);
}

@Delete(':id')
remove(@Param('id') id: string) {
  return this.questionsService.remove(id);
}
@Put(':id')
async update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
  console.log("Données reçues pour mise à jour : ", updateQuestionDto); // Ajoute cette ligne pour voir les données envoyées.
  return this.questionsService.update(id, updateQuestionDto);
}


  



  
}
