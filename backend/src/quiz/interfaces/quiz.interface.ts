// src/quizzes/interfaces/quiz.interface.ts

import { Document } from 'mongoose';

export interface Quiz extends Document {
  readonly title: string;       // Titre du quiz
  readonly description?: string; // Description optionnelle
  readonly createdAt: Date;     // Date de création
}
