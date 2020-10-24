import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Observable} from "rxjs";
import {User} from "@prisma/client";

@Injectable()
export class GroupRoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        return this._matchUserRoles(user.role, roles);
    }

    _matchUserRoles(userRole: string, matchingRoles: string[]): boolean {
        return matchingRoles.includes(userRole);
    }
}