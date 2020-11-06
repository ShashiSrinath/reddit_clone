import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddVoteDto, CreatePostDto, UpdatePostDto } from './post.dto';
import { Post } from '@prisma/client';
import { TimelinePost, SinglePost } from './post.interface';
import { getVotes } from './util/get-post_count';
import { VoteType } from '../core/enums/vote-type';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(userId: number, args: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        title: args.title,
        content: args.content,
        group: {
          connect: {
            id: args.groupId,
          },
        },
      },
    });
  }

  async getPostById(postId: number, userId?: number): Promise<SinglePost> {
    const post = await this.prisma.post.findOne({
      where: {
        id: postId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        group: true,
        comments: true,
        votes: true,
      },
    });
    return { ...post, votes: getVotes(post.votes, userId) };
  }

  async getGroupPosts(
    groupId: number,
    userId?: number
  ): Promise<TimelinePost[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        groupId: groupId,
      },
      orderBy: {
        id: 'desc',
      },
      include: {
        votes: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        comments: true,
        group: true,
      },
    });

    return posts.map((p) => ({
      ...p,
      comments: p.comments.length,
      votes: getVotes(p.votes, userId),
    }));
  }

  async getPostsByUser(
    userId: number,
    loggedInUserId?: number
  ): Promise<TimelinePost[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        id: 'desc',
      },
      include: {
        votes: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        comments: {
          select: {
            id: true,
          },
        },
        group: true,
      },
    });

    return posts.map((p) => ({
      ...p,
      comments: p.comments.length,
      votes: getVotes(p.votes, loggedInUserId),
    }));
  }

  async updatePost(userId: number, args: UpdatePostDto): Promise<Post> {
    const post = await this.prisma.post.findOne({
      where: {
        id: args.postId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    if (post.userId != userId) {
      throw new UnauthorizedException(
        "You don't have permission to edit this post"
      );
    }

    return this.prisma.post.update({
      data: {
        content: args.content,
      },
      where: {
        id: args.postId,
      },
    });
  }

  async addVote(
    userId: number,
    args: AddVoteDto
  ): Promise<{ count: number; userVoteType: VoteType }> {
    const d = new Date();

    await this.prisma.postVote.upsert({
      where: {
        postId_userId: {
          postId: args.postId,
          userId: userId,
        },
      },
      create: {
        createdDatetime: d,
        voteType: args.vote,
        post: {
          connect: {
            id: args.postId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      update: {
        createdDatetime: d,
        voteType: args.vote,
        post: {
          connect: {
            id: args.postId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    const post = await this.prisma.post.findOne({
      where: {
        id: args.postId,
      },
      select: {
        votes: true,
      },
    });

    return getVotes(post.votes, userId);
  }

  async deletePost(
    postId: number,
    userId?: number,
    options?: { ignoreUser: boolean }
  ): Promise<Post> {
    if (!options?.ignoreUser) {
      const post = await this.prisma.post.findOne({
        where: {
          id: postId,
        },
        select: {
          userId: true,
        },
      });
      if (!post || post.userId != userId) {
        throw new UnauthorizedException(
          "You don't have permission to make changes to this post"
        );
      }
    }

    //delete post votes
    await this.prisma.postVote.deleteMany({
      where: {
        postId: postId,
      },
    });

    return this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
