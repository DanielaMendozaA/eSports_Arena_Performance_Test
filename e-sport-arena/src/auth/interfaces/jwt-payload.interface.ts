import { UserRoleEnum } from "src/common/enums/roles.enum";

export interface JwtPayload {
    id: string;
    email: string;
    role: UserRoleEnum;
}