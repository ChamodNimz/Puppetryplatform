import { ApiProperty } from '@nestjs/swagger';
import { InsuranceType, PainType } from 'src/types/interfaces/types-enums';

export class CreateLeadsDto {
  readonly id?: string;
  @ApiProperty()
  readonly firstName: string;
  @ApiProperty()
  readonly lastName: string;
  @ApiProperty()
  readonly dateOfBirth: string;
  @ApiProperty()
  readonly phoneNo: string;
  @ApiProperty()
  readonly state: string;
  @ApiProperty()
  readonly hasInsurance: boolean;
  // @ApiProperty({ enum: ['Red', 'White', 'Blue Medicare Card','Private Insurance']})
  // readonly insuranceType: InsuranceType;
  // @ApiProperty({ enum: ['Back', 'Shoulder', 'Knee','Wrist','Ankle','Cervical','Elbow']})
  // readonly painArea: PainType;
}
