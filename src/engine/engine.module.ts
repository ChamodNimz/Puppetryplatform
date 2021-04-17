import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EngineService } from './engine.service';
import { EngineController } from './engine.controller';
import { BookingSchema } from './schemas/booking.schema';
import { PuppetTeamModule } from 'src/puppetryTeam/PuppetTeam.module';
import { ShowRatingShema } from './schemas/rateShow.schema';
import { ShareCountSchema } from './schemas/shareCount.schema';
import { CommentSchema } from './schemas/comment.schema';
import { LikeDislikeSchema } from './schemas/likeDislike.schema';

@Module({
  imports: [
    PuppetTeamModule,
    MongooseModule.forFeature([
      { name: 'Booking', schema: BookingSchema },
      { name: 'ShowRating', schema: ShowRatingShema },
      { name: 'ShareCount', schema: ShareCountSchema },
      { name: 'Comment', schema: CommentSchema },
      { name: 'LikeDislike', schema: LikeDislikeSchema },
    ])
  ],
  controllers: [EngineController],
  providers: [EngineService],
  exports: [EngineService]
})
export class EngineModule { }
