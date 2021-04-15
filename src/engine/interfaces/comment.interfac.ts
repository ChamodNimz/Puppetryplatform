
import { Document } from 'mongoose';

export interface Comment extends Document {

  id?: string;
  bookedShow: string;
  bookedTeam: string;
  publicUserId: string;
  comments: [string]
}
