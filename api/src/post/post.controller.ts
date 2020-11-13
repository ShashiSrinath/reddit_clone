import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GroupRoleGuard } from '../group/guards/group-role.guard';
import { GroupRoles } from '../group/group-role.decorator';
import { GroupUserRole, UserRole } from '@prisma/client';
import { AddVoteDto, CreatePostDto, UpdatePostDto } from './post.dto';
import { Post as PostModel } from '@prisma/client';
import { Roles } from '../auth/auth-role.decorator';
import { VoteType } from '../core/enums/vote-type';
import { AnonymousAuthGuard } from '../auth/guards/anonymous-auth.guard';
import { PostSortType } from './lib/findPostQueryBuilder';
import { RecentPost } from './post.interface';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @GroupRoles(GroupUserRole.user, GroupUserRole.moderator, GroupUserRole.admin)
  @UseGuards(JwtAuthGuard, GroupRoleGuard)
  async createPost(
    @Req() req,
    @Body() args: CreatePostDto
  ): Promise<PostModel> {
    return this.postService.createPost(req.user.userId, args);
  }

  @Get('id/:id')
  @UseGuards(AnonymousAuthGuard)
  async getPostByID(
    @Req() req,
    @Param('id', new ParseIntPipe()) id
  ): Promise<PostModel> {
    return this.postService.getPostById(id, req.user.userId);
  }

  @Get('/')
  @UseGuards(AnonymousAuthGuard)
  async getPosts(
    @Req() req,
    @Query('sortBy') sortBy: PostSortType,
    @Query('page', new ParseIntPipe()) page = 1
  ): Promise<PostModel[]> {
    return this.postService.getPosts({
      userId: req.user.userId,
      sortBy,
      page,
    });
  }

  @Get('/recent-post-visits')
  @UseGuards(JwtAuthGuard)
  async getRecentPosts(@Req() req): Promise<RecentPost[]> {
    return this.postService.getRecentPosts(req.user.userId);
  }

  @Get('group/:id')
  @UseGuards(AnonymousAuthGuard)
  async getPostsByGroup(
    @Req() req,
    @Param('id', new ParseIntPipe()) id,
    @Query('sortBy') sortBy,
    @Query('page', new ParseIntPipe()) page
  ): Promise<PostModel[]> {
    return this.postService.getPosts({
      where: {
        by: 'group_id',
        groupId: id,
      },
      userId: req.user.userId,
      sortBy,
      page,
    });
  }

  @Get('user/:id')
  @UseGuards(AnonymousAuthGuard)
  async getPostsByUser(
    @Req() req,
    @Param('id', new ParseIntPipe()) id,
    @Query('sortBy') sortBy,
    @Query('page', new ParseIntPipe()) page
  ): Promise<PostModel[]> {
    return this.postService.getPosts({
      where: {
        by: 'user_id',
        userId: id,
      },
      userId: req.user.userId,
      sortBy,
      page,
    });
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Req() req,
    @Body() args: UpdatePostDto
  ): Promise<PostModel> {
    return this.postService.updatePost(req.user.userId, args);
  }

  @Put('add-vote')
  @UseGuards(JwtAuthGuard)
  async addVote(
    @Req() req,
    @Body() args: AddVoteDto
  ): Promise<{ count: number; userVoteType: VoteType }> {
    return this.postService.addVote(req.user.userId, args);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @Req() req,
    @Param('id', new ParseIntPipe()) id
  ): Promise<PostModel> {
    return this.postService.deletePost(id, req.userId);
  }

  @Delete('moderator/:id')
  @GroupRoles(GroupUserRole.user, GroupUserRole.moderator, GroupUserRole.admin)
  @UseGuards(JwtAuthGuard, GroupRoleGuard)
  async deletePostModerator(
    @Param('id', new ParseIntPipe()) id
  ): Promise<PostModel> {
    return this.postService.deletePost(id, undefined, { ignoreUser: true });
  }

  @Delete('admin/:id')
  @Roles(UserRole.administrator, UserRole.moderator)
  @UseGuards(JwtAuthGuard)
  async deletePostAdmin(
    @Param('id', new ParseIntPipe()) id
  ): Promise<PostModel> {
    return this.postService.deletePost(id, undefined, { ignoreUser: true });
  }
}
