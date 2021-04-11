import { ApiProperty } from "@nestjs/swagger";

export class Answer {

  @ApiProperty()
  question: string;
  @ApiProperty()
  answer: boolean;
}
