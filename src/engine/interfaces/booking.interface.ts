import { Document } from 'mongoose';

export interface Booking extends Document {

  id?: string;
  bookedShow: string;
  bookedTeam: string;
}
