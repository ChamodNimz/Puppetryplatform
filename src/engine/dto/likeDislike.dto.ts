import { ApiProperty } from '@nestjs/swagger';

export class LikeDislikeDto {
  readonly id?: string;
  @ApiProperty()
  readonly bookedShow: string;
  @ApiProperty()
  readonly bookedTeam: string;
  @ApiProperty()
  readonly publicUserId: string;
  @ApiProperty()
  liked: boolean;
  @ApiProperty()
  disliked: boolean;
}
