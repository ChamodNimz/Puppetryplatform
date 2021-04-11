import { ApiProperty } from '@nestjs/swagger';

export class CreatePuppetTeamDto {

  readonly id?: string;
  @ApiProperty()
  readonly teamName: string;
  @ApiProperty()
  readonly startedSince: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  readonly teamMemberCount: number;
  @ApiProperty()
  readonly typeOfPerformance: string;
  role: string;

}