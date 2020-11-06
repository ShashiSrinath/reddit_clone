import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User, GroupUser } from '@prisma/client';
import { GroupService } from '../group.service';

@Injectable()
export class GroupRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly groupService: GroupService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>(
      'group_roles',
      context.getHandler()
    );
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const useReq = request.user;
    const groupId: number = parseInt(request.body.groupId);

    if (!groupId || isNaN(groupId)) {
      throw new BadRequestException('groupId is invalid');
    }

    const groupUser: GroupUser = await this.groupService.getGroupUser(
      groupId,
      useReq.userId
    );

    if (!groupUser) {
      throw new NotFoundException('Group not found');
    }
    return this._matchUserRoles(groupUser.role, roles);
  }

  _matchUserRoles(userRole: string, matchingRoles: string[]): boolean {
    return matchingRoles.includes(userRole);
  }
}
