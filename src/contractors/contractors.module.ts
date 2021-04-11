import { Module } from '@nestjs/common';
import { ContractorsService } from './contractors.service';
import { ContractorsController } from './contractors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContractorSchema } from './schemas/contractor.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Contractor', schema: ContractorSchema}])],
  controllers: [ContractorsController],
  providers: [ContractorsService],
  exports: [ContractorsService]
})
export class ContractorsModule {}
