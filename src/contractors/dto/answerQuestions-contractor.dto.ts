import { ApiProperty } from '@nestjs/swagger';
import { Answer } from '../interfaces/answer.interface';

export class AnswerQuestionsDto {

  @ApiProperty()
  readonly contractorId?: string;
  //@ApiProperty()
  status: number;
  @ApiProperty( { type: () => [Answer] })
  readonly answers: [Answer];
  
}
