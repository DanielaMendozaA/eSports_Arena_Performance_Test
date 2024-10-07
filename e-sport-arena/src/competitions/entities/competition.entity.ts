import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuditableEntity } from "src/common/entities/auditable.entity";
import { Tournament } from "src/tournaments/entities/tournament.entity";
import { Player } from "src/players/entities/player.entity";
import { Result } from "src/results/entities/result.entity";


@Entity()
export class Competition extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    matchDate: Date;

    @ManyToOne(() => Tournament, tournament => tournament.competition)
    tournament: Tournament

    @ManyToMany(() => Player, (player) => player.competitions)
    players: Player[];

    @OneToMany(() => Result, result => result.competition)
    result: Result[];

}
