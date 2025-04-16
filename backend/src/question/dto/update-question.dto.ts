import { IsArray, IsString, IsNotEmpty, ArrayMinSize } from 'class-validator';

export class UpdateQuestionDto {
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
