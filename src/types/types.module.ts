import { Module } from '@nestjs/common';
import { TypesController } from './types.controller';

@Module({
  imports: [],
  controllers: [TypesController],
  providers: [],
}) 
export class TypesModule {}
