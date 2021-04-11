import { Document } from 'mongoose';

export interface Question extends Document {

  id?: string;
  question: string;
}
