import { Module } from '@nestjs/common';
import { ComputersController } from './computers.controller';
import { ComputersService } from './computers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComputersRepository } from './computer.repository';
import { Computer } from './computer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Computer])],
  controllers: [ComputersController],
  providers: [ComputersService, ComputersRepository],
})
export class ComputersModule {}
