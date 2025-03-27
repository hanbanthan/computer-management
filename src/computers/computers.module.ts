import { Module } from '@nestjs/common';
import { ComputersController } from './computers.controller';
import { ComputersService } from './computers.service';

@Module({
  controllers: [ComputersController],
  providers: [ComputersService],
})
export class ComputersModule {}
