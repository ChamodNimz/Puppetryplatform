
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  readonly id?: string;
  @ApiProperty()
  readonly bookedShow: string;
  @ApiProperty()
  readonly bookedTeam: string;
  @ApiProperty()
  readonly publicUserId: string;
  @ApiProperty()
  readonly comments: [string];
}
