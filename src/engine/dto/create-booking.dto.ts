import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  readonly id?: string;
  @ApiProperty()
  readonly bookedShow: string;
  @ApiProperty()
  readonly bookedTeam: string;
  ticketPrice: number;
}
