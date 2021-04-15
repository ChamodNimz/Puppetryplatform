import { ApiProperty } from '@nestjs/swagger';

export class CountShareDto {
  readonly id?: string;
  @ApiProperty()
  readonly bookedShow: string;
  @ApiProperty()
  readonly bookedTeam: string;
  @ApiProperty()
  readonly publicUserId: string;
  @ApiProperty()
  shared: boolean;
  count: number;
}
