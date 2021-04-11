import { Injectable } from '@nestjs/common';
import { ContractorsService } from 'src/contractors/contractors.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private contractorsService: ContractorsService, private jwtService: JwtService) { }

  async validateUser(email: string, password: string): Promise<any> {

    const user = await this.contractorsService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {

      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDoc: any) {

    const user = userDoc._doc;
    const payload = { username: user.email, sub: user._id, roles: user.roles }; // user.username or email
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
