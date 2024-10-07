import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Seeder } from "typeorm-extension";
import { Player } from "src/players/entities/player.entity";
import { Rank } from "src/players/enums/rank.enum";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class PlayersSeeder implements Seeder {

    constructor(
        @InjectRepository(Player)
        private readonly playerRepository: Repository<Player>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async run(): Promise<void> {
        const players = [
            { gamerTag: 'Player1', rank: Rank.BRONZE },
            { gamerTag: 'Player2', rank: Rank.SILVER },
            { gamerTag: 'Player3', rank: Rank.GOLD },
            { gamerTag: 'Player4', rank: Rank.PLATINUM },
            { gamerTag: 'Player5', rank: Rank.BRONZE },
            { gamerTag: 'Player6', rank: Rank.SILVER },
            { gamerTag: 'Player7', rank: Rank.GOLD },
            { gamerTag: 'Player8', rank: Rank.PLATINUM },
            { gamerTag: 'Player9', rank: Rank.BRONZE },
            { gamerTag: 'Player10', rank: Rank.SILVER }
        ];

        for (const playerData of players) {
            const playerExists = await this.playerRepository.findOneBy({ gamerTag: playerData.gamerTag });
            if (!playerExists) {
                const newUser = await this.userRepository.save({
                    userName: playerData.gamerTag,
                    email: `${playerData.gamerTag}@example.com`,
                    password: 'hashedpassword', 
                });

                const newPlayer = this.playerRepository.create({
                    ...playerData,
                    user: { id: newUser.id} 
                });

                await this.playerRepository.save(newPlayer);
                Logger.log(`Player ${playerData.gamerTag} created`);
            } else {
                Logger.log(`Player ${playerData.gamerTag} already exists`);
            }
        }
    }
}
