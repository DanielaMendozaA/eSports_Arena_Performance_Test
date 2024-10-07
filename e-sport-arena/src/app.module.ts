import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { JoiValidation } from './common/config/joi-validation.config';

import { CommonModule } from './common/common.module';
import { DatabaseConfigService } from './common/config/db-config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PlayersModule } from './players/players.module';
import { SeederRunner } from './common/seeders/seeder-runner.seeder';
import { UsersSeeder } from './common/seeders/users.seeder';
import { PlayersSeeder } from './common/seeders/players.seeder';


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
    CommonModule,
    UsersModule,
    AuthModule,
    PlayersModule
  ],
  providers: [
    PlayersSeeder,
    UsersSeeder,
    SeederRunner
  ],
})
export class AppModule  implements OnModuleInit{
  constructor(
    private readonly seederRunner: SeederRunner,
    private configService: ConfigService
  ){}

  async onModuleInit(){
    Logger.log('AppModule initialized. Seeding database...');
    const executedSeeders = this.configService.get<boolean>('EXECUTE_SEEDS');
    console.log('executedSeeders', executedSeeders);
    
    if(executedSeeders){
      Logger.log('Executing seeders...');
      await this.seederRunner.runSeeds();
    }else{
      Logger.log('Seeders execution skipped.');
    }

    
  }

}
