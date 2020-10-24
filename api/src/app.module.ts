import { Module } from '@nestjs/common';
import {PrismaModule} from "./prisma/prisma.module";
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import { GroupModule } from './group/group.module';

@Module({
  imports: [PrismaModule,UserModule, AuthModule, GroupModule],
})
export class AppModule {}
