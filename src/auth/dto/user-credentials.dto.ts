import { ApiProperty } from '@nestjs/swagger';

export class UserCredentialsDto {
    
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  password: string;
}
