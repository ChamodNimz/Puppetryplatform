import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesGuard } from 'src/roles/roles.guard';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { QuestionSchema } from './schemas/question.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Question', schema: QuestionSchema}])],
  controllers: [QuestionsController],
  providers: [QuestionsService]
})
export class QuestionsModule {}
