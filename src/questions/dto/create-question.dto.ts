import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  readonly id?: string;
  @ApiProperty()
  readonly question: string;
}