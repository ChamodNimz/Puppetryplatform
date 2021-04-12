import { ApiProperty } from '@nestjs/swagger';

export class ScheduleShowDto {

  @ApiProperty()
  readonly id?: string;
  @ApiProperty()
  readonly showName: string;
  @ApiProperty()
  readonly theme: string;
  @ApiProperty()
  readonly date: string;
  @ApiProperty()
  readonly venue: string;
  @ApiProperty()
  readonly ticketPrice: number;
  @ApiProperty()
  readonly typeOfPerformance: string;
  @ApiProperty()
  readonly long: string;
  @ApiProperty()
  readonly lat: string;
  @ApiProperty()
  readonly seatCount: number;
}