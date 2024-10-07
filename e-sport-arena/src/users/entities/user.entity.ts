import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { AuditableEntity } from "src/common/entities/auditable.entity";
import { UserRoleEnum } from "src/common/enums/roles.enum";
import { Player } from "src/players/entities/player.entity";

@Entity()
export class User extends AuditableEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { name: 'user_name', unique: true})
    userName: string;

    @Column('text', { unique: true})
    email: string;

    @Column('text', { select: false})
    password: string;

    @Column({
        type: "enum",
        enum: ["admin", "player"],
        default: "player"
    })
    role: UserRoleEnum

    @OneToMany(() => Player, player => player.user)
    player: Player[];
}
