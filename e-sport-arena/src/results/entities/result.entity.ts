import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuditableEntity } from "src/common/entities/auditable.entity";
import { Competition } from "src/competitions/entities/competition.entity";
import { Player } from "src/players/entities/player.entity";


@Entity()
export class Result extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    winnerPoints: number;

    @Column('int')
    loserPoints: number;

    @ManyToOne(() => Competition, competition => competition.result)
    competition: Competition

    @ManyToOne(() => Player, (player) => player.wonMatches)
    @JoinColumn({ name: 'winnerId' })
    winner: Player;

    @ManyToOne(() => Player, (player) => player.lostMatches)
    @JoinColumn({ name: 'loserId' })
    loser: Player;


}
