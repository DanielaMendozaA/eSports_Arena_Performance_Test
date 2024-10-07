import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rank } from "../enums/rank.enum";
import { AuditableEntity } from "src/common/entities/auditable.entity";
import { User } from "src/users/entities/user.entity";

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
    
}
