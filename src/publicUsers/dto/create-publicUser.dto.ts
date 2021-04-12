import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/enums/role.enum';

export class CreatePublicUserDto {
  readonly id?: string;
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  password: string;
  roles: Role.PublicUser;
  @ApiProperty()
  readonly long: string;
  @ApiProperty()
  readonly lat: string;
}
