// src/quiz/schemas/quiz.schema.ts
import { Schema } from 'mongoose';

export const QuizSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

