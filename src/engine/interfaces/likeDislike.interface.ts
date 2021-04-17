import { Document } from 'mongoose';

export interface LikeDislike extends Document {

  id?: string;
  bookedShow: string;
  bookedTeam: string;
  liked: boolean
  disliked: boolean
  publicUserId: string;
}
