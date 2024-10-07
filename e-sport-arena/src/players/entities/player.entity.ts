import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rank } from "../enums/rank.enum";
import { AuditableEntity } from "src/common/entities/auditable.entity";
import { User } from "src/users/entities/user.entity";
import { Competition } from "src/competitions/entities/competition.entity";
import { Result } from "src/results/entities/result.entity";

@Entity()
export class Player extends AuditableEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {unique: true})
    gamerTag: string;

    @Column({
        type: 'enum',
        enum: Rank,
        default: Rank.BRONZE,
      })
      rank: Rank;

    @ManyToOne(() => User, user => user.player)
    user: User

    @ManyToMany(() => Competition, (competition) => competition.players)
    @JoinTable({
        name: 'competition_players', 
        joinColumn: {
            name: 'playerId', 
            referencedColumnName: 'id' 
        },
        inverseJoinColumn: {
            name: 'competitionId', 
            referencedColumnName: 'id'
        }
    })
    competitions: Competition[];

    @OneToMany(() => Result, (result) => result.winner)
    wonMatches: Result[];

    @OneToMany(() => Result, (result) => result.loser)
    lostMatches: Result[];
    
}
