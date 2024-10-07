import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuditableEntity } from "src/common/entities/auditable.entity";
import { Competition } from "src/competitions/entities/competition.entity";


@Entity()
export class Tournament extends AuditableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { unique: true })
    name: string;

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date' })
    endDate: Date;

    @OneToMany(() => Competition, competition => competition.tournament)
    competition: Competition[]
}
