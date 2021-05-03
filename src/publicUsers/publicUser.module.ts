import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicUserSchema } from './schemas/publicUser.schema';
import { PublicUserService } from './publicUser.service';
import { PublicUserController } from './publicUser.controller';
import { EngineModule } from 'src/engine/engine.module';
import { PuppetTeamModule } from 'src/puppetryTeam/PuppetTeam.module';

@Module({
  imports: [
    PuppetTeamModule,
    EngineModule,
    MongooseModule.forFeature([{name: 'PublicUser', schema: PublicUserSchema}])],
  controllers: [PublicUserController],
  providers: [PublicUserService],
  exports: [PublicUserService]
})
export class PublicUserModule {}
