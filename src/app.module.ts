import { Module } from '@nestjs/common';
import keys from './config/keys';

// modules  imports
import { MongooseModule } from '@nestjs/mongoose';
import { ContractorsModule } from './contractors/contractors.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PuppetTeamModule } from './puppetryTeam/PuppetTeam.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    ContractorsModule,
    AuthModule,
    MongooseModule.forRoot(keys.mongoURL),
    PuppetTeamModule
    ],
  controllers: [], //AppController
  providers: [], //AppService
})
export class AppModule {}
