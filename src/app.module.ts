import { Module } from '@nestjs/common';
import { ComputersModule } from './computers/computers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.dev`],
      validationSchema: configValidationSchema,
    }),
    ComputersModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configSevice: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: configSevice.get('DB_HOST'),
        port: configSevice.get('DB_PORT'),
        username: configSevice.get('DB_USERNAME'),
        password: configSevice.get('DB_PASSWORD'),
        database: configSevice.get('DB_DATABASE'),
      }),
    }),
    AuthModule,
  ],
})
export class AppModule {}