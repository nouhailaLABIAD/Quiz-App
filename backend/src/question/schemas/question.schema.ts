import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';
@Schema()
export class Question {
  @Prop({ required: true }) quizId: mongoose.Types.ObjectId;
  @Prop({ required: true }) text: string;
  @Prop({ required: true, type: [String] }) choices: string[];
  @Prop({ required: true }) correctAnswer: string;
}
export type QuestionDocument = Question & Document;
export const QuestionSchema = SchemaFactory.createForClass(Question);
