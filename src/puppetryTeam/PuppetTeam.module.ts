import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
