import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ContractorsModule } from 'src/contractors/contractors.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { PuppetTeamModule } from 'src/puppetryTeam/PuppetTeam.module';

@Module({
  imports:[
    PuppetTeamModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.duration }, 
    })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController]
})
export class AuthModule {}
