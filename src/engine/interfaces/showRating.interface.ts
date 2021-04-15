import { Document } from 'mongoose';

export interface ShowRating extends Document {

  id?: string;
  bookedShow: string;
  bookedTeam: string;
  rating: number
}
