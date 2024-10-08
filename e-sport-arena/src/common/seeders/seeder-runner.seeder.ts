import { Injectable } from "@nestjs/common";
import { UsersSeeder } from "./users.seeder";
import { PlayersSeeder } from "./players.seeder";
import { TournamentsSeeder } from "./tournaments.seeder";




@Injectable()
export class SeederRunner{
    constructor(
        private readonly usersSeeder: UsersSeeder,
        private readonly playerSeeder: PlayersSeeder,
        private readonly tournamentsSeeder: TournamentsSeeder
    ){}


    async runSeeds() : Promise<void>{
        await this.usersSeeder.run();
        await this.playerSeeder.run();
        await this.tournamentsSeeder.run();

    }


}