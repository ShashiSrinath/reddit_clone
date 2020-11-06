import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { PrismaModule } from '../prisma/prisma.module';
import { GroupRoleGuard } from './guards/group-role.guard';

@Module({
  imports: [PrismaModule],
  controllers: [GroupController],
  providers: [GroupService, GroupRoleGuard],
  exports: [GroupRoleGuard, GroupService],
})
export class GroupModule {}
