// src/questions/schemas/reponse.schema.ts
import { Schema } from 'mongoose';

export const ReponseSchema = new Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false }
});