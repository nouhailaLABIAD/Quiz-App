// src/questions/interfaces/question.interface.ts
import { Document } from 'mongoose';

export interface Question extends Document {
  readonly questionText: string;
  readonly quiz: string; // ID du quiz parent
}
