import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesGuard } from 'src/roles/roles.guard';
import { PuppetTeamController } from './PuppetTeam.controller';
import { PuppetTeamService } from './PuppetTeam.service';
import { PuppetTeamSchema } from './schemas/PuppetTeam.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'PuppetTeam', schema: PuppetTeamSchema}])],
  controllers: [PuppetTeamController],
  providers: [PuppetTeamService],
  exports: [PuppetTeamService]
})
export class PuppetTeamModule {}
