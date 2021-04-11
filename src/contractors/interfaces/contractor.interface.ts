import { Document } from 'mongoose';

export interface Contractor extends Document {

  id?: string;
  username: string;
  email: string;
  status: number;
  password: string;
  answers: any;
  answeredAt?: Date;
}
