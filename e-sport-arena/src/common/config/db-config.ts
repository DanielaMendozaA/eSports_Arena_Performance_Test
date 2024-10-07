import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from "src/users/entities/user.entity";
import { Player } from "src/players/entities/player.entity";
import { Competition } from "src/competitions/entities/competition.entity";
import { Result } from "src/results/entities/result.entity";
import { Tournament } from "src/tournaments/entities/tournament.entity";


@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory{
    constructor(private readonly configService: ConfigService){}

    createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return{
            type: 'postgres',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            synchronize: true,
            entities: [User, Player, Competition, Result, Tournament]

        };  
    };
};