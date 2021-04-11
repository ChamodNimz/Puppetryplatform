import { Document } from 'mongoose';

export interface PuppetTeam extends Document {

  id?: string;
  readonly teamName: string;
  readonly startedSince: string;
  readonly email: string;
  readonly password: string;
  readonly teamMemberCount: number;
  readonly typeOfPerformance: string;
}
