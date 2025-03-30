import { Module } from '@nestjs/common';
import { ComputersController } from './computers.controller';
import { ComputersService } from './computers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComputersRepository } from './computers.repository';
import { Computer } from './computer.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Computer]), AuthModule],
  controllers: [ComputersController],
  providers: [ComputersService, ComputersRepository],
})
export class ComputersModule {}
