import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { JoiValidation } from './common/config/joi-validation.config';

import { CommonModule } from './common/common.module';
import { DatabaseConfigService } from './common/config/db-config';


@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: JoiValidation,
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService

    }),
    CommonModule],
  providers: [],
})
export class AppModule {}
