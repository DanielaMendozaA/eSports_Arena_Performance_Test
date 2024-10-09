import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";

import { ApiBearerAuth } from "@nestjs/swagger";
import { UserRoleEnum } from "src/common/enums/roles.enum";
import { JwtGuard } from "../guards/jwt.guard";
import { RolesGuard } from "../guards/roles.guard";
import { ApiKeyGuard } from "../guards/api-key.guard";

export const ROLES_KEY = 'roles';

export function VerifyAuthService(roles: UserRoleEnum[]){
    return applyDecorators(
        SetMetadata(ROLES_KEY, roles),
        UseGuards(ApiKeyGuard ,JwtGuard, RolesGuard),
        ApiBearerAuth('access-token')
    );
}

