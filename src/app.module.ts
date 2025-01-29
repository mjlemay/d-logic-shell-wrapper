import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProcessService } from './process/process.service';
import { ProcessController } from './process/process.controller';

@Module({
  imports: [],
  controllers: [AppController, ProcessController],
  providers: [AppService, ProcessService],
})
export class AppModule {}
