import { Module } from '@nestjs/common';
import { ComputersModule } from './computers/computers.module';

@Module({
  imports: [ComputersModule],
})
export class AppModule {}
