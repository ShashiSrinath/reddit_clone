import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [PrismaModule, GroupModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
