import { Document } from 'mongoose';

export interface ShareCount extends Document {

  id?: string;
  bookedShow: string;
  bookedTeam: string;
  count: number
}
