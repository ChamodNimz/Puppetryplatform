import { Document } from 'mongoose';

export interface PuppetTeam extends Document {

  id?: string;
  readonly teamName: string;
  readonly startedSince: string;
  readonly email: string;
  readonly password: string;
  readonly teamMemberCount: number;
  readonly typeOfPerformance: string;
  shows: [PuppetShow];

}

export interface PuppetShow {

  id?: string;
  showName: string;
  theme: string;
  date: string;
  venue: string;
  showDescription: string;
  ticketPrice: number;
  long: string;
  lat: string,
  seatCount: number,
  typeOfPerformance: string

}
