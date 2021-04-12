import { Document } from 'mongoose';

export interface PublicUser extends Document {

  id?: string;
  username: string;
  email: string;
  password: string;
  long: string;
  lat: string;
}
