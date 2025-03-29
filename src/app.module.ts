import { Module } from '@nestjs/common';
import { ComputersModule } from './computers/computers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ComputersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'computer-management',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
