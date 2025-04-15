import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateQuizDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
