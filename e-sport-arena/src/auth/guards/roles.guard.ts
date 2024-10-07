import { CanActivate, ExecutionContext, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoleEnum } from 'src/common/enums/roles.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) { }
  private readonly logger = new Logger(RolesGuard.name)
  
  canActivate(context: ExecutionContext): boolean {
    const roles: UserRoleEnum[] = this.reflector.get<UserRoleEnum[]>(ROLES_KEY, context.getHandler());
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log(user);

    const validRole = roles.includes(user.role)

    if(!validRole){
      this.logger.error('User does not have the necessary role');
      throw new ForbiddenException("You don't have required permissions to this path")
    }

    return true;
  }
}
