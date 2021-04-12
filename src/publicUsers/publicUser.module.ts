import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicUserSchema } from './schemas/publicUser.schema';
import { PublicUserService } from './publicUser.service';
import { PublicUserController } from './publicUser.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: 'PublicUser', schema: PublicUserSchema}])],
  controllers: [PublicUserController],
  providers: [PublicUserService],
  exports: [PublicUserService]
})
export class PublicUserModule {}
