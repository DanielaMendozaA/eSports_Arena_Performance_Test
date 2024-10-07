import { Injectable } from "@nestjs/common";
import { UsersSeeder } from "./users.seeder";
import { PlayersSeeder } from "./players.seeder";




@Injectable()
export class SeederRunner{
    constructor(
        private readonly usersSeeder: UsersSeeder,
        private readonly playerSeeder: PlayersSeeder,
    ){}


    async runSeeds() : Promise<void>{
        await this.usersSeeder.run();
        await this.playerSeeder.run();

    }


}