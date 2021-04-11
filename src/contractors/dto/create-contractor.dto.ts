import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/enums/role.enum';

export class CreateContractorDto {
  readonly id?: string;
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly email: string;
  // @ApiProperty()
  status: number;
  @ApiProperty()
  password: string;
  // @ApiProperty()
  roles: Role.User;
}
