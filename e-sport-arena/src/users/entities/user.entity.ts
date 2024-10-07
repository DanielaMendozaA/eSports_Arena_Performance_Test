import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { AuditableEntity } from "src/common/entities/auditable.entity";
import { UserRoleEnum } from "src/common/enums/roles.enum";

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
        enum: ["admin", "regular_client"],
        default: "regular_client"
    })
    role: UserRoleEnum
}
