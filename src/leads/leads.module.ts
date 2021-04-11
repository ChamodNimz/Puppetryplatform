import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { LeadSchema } from './schemas/lead.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Lead', schema: LeadSchema}])],
  controllers: [LeadsController],
  providers: [LeadsService],
}) 
export class LeadsModule {}
