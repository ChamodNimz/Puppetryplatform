import { ApiProperty } from '@nestjs/swagger';

export class RateShowDto {
  readonly id?: string;
  @ApiProperty()
  readonly bookedShow: string;
  @ApiProperty()
  readonly bookedTeam: string;
  @ApiProperty()
  readonly publicUserId: string;
  @ApiProperty()
  readonly rating: number;
}
