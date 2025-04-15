// src/questions/interfaces/question.interface.ts
import { Document } from 'mongoose';
import { ReponseDto } from '../dto/reponse.dto'; // ou adapte le chemin selon l'organisation

export interface Question extends Document {
  readonly questionText: string;
  readonly answers: ReponseDto[];
  readonly quiz: string; // ID du quiz parent
}
