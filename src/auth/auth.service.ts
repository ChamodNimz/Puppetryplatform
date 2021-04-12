import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { PuppetTeamService } from 'src/puppetryTeam/PuppetTeam.service';
import { PublicUserService } from 'src/publicUsers/publicUser.service';

@Injectable()
export class AuthService {

  constructor(
    private puppetTeamService: PuppetTeamService, 
    private jwtService: JwtService,
    private publicUserService: PublicUserService,

    ) { }

  async validateUser(email: string, password: string): Promise<any> {

    const user = await this.puppetTeamService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {

      const { password, ...result } = user;
      return result;
    }

    const publicUser = await this.publicUserService.findOneByEmail(email);
    if (publicUser && await bcrypt.compare(password, publicUser.password)) {

      const { password, ...result } = publicUser;
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
