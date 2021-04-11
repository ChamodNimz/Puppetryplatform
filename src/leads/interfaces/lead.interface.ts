import { Document } from 'mongoose';

export interface Lead extends Document {

  id?: string;
  firstName: string;
  lastName: number;
  dateOfBirth: Date;
  phoneNo: string;
  hasInsurance: boolean;
  state: string;
  // insuranceType: number;
  // painArea: number;
}
