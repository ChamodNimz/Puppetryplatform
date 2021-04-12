import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EngineService } from './engine.service';
import { EngineController } from './engine.controller';
import { BookingSchema } from './schemas/booking.schema';
import { PuppetTeamModule } from 'src/puppetryTeam/PuppetTeam.module';

@Module({
  imports: [
    PuppetTeamModule,
    MongooseModule.forFeature([{name: 'Booking', schema: BookingSchema}])],
  controllers: [EngineController],
  providers: [EngineService],
  exports: [EngineService]
})
export class EngineModule {}
