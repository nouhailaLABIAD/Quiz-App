import { Controller, Post, Body, Get, Delete, Param, Put, BadRequestException } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async createQuiz(@Body() body: CreateQuizDto) {
    console.log('Received body:', body);
    return this.quizService.createQuiz(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }

  @Get()
  findAll() {
    return this.quizService.findAll(); // ou n'importe quelle logique
  }
  @Put(':id')
  async updateQuiz(
    @Param('id') id: string,
    @Body() updateQuizDto: UpdateQuizDto
  ) {
    try {
      return await this.quizService.updateQuiz(id, updateQuizDto);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du quiz:", error);
      throw new BadRequestException('Erreur lors de la mise à jour du quiz');
    }
  }
  
  @Delete(':id')
  async deleteQuiz(@Param('id') id: string) {
    return this.quizService.deleteQuiz(id);
  }
}
