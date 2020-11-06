import { SetMetadata } from '@nestjs/common';

export const GroupRoles = (...groupRoles: string[]) => SetMetadata('group_roles', groupRoles);