import { IsString, IsArray, ArrayMinSize, IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  quizId: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsArray()
  @ArrayMinSize(2)
  choices: string[];

  @IsString()
  @IsNotEmpty()
  correctAnswer: string;
}
