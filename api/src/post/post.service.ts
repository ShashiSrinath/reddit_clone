import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddVoteDto, CreatePostDto, UpdatePostDto } from './post.dto';
import { Post } from '@prisma/client';
import { RecentPost, SinglePost, TimelinePost } from './post.interface';
import { getVotes } from './util/get-post_count';
import { VoteType } from '../core/enums/vote-type';
import {
  findAndSortByHotQuery,
  findAndSortByNewQuery,
  findAndSortByTopQuery,
  FindPostWhereType,
  findRecentVisitsByUser,
  PostSortType,
} from './lib/findPostQueryBuilder';

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

    if (!post) {
      throw new NotFoundException('post not found');
    }

    //create post visit
    if (userId) {
      await this.prisma.postVisit.create({
        data: {
          Post: {
            connect: {
              id: post.id,
            },
          },
          User: {
            connect: {
              id: userId,
            },
          },
          time: new Date(),
        },
      });
    }

    return { ...post, votes: getVotes(post.votes, userId) };
  }

  async getPosts(options: {
    userId?: number;
    where?: FindPostWhereType;
    sortBy: PostSortType;
    page: number;
  }): Promise<TimelinePost[]> {
    const postLimit = 10;
    const offset = (options.page - 1) * postLimit;

    switch (options.sortBy) {
      case PostSortType.hot:
        //sort hot posts
        return this.prisma.$queryRaw(
          findAndSortByHotQuery({
            where: options.where,
            reqUser: options.userId,
            limit: postLimit,
            offset: offset,
          })
        );
      case PostSortType.new:
        //sort hot posts
        return this.prisma.$queryRaw(
          findAndSortByNewQuery({
            where: options.where,
            reqUser: options.userId,
            limit: postLimit,
            offset: offset,
          })
        );
      case PostSortType.top:
        //sort hot posts
        return this.prisma.$queryRaw(
          findAndSortByTopQuery({
            where: options.where,
            reqUser: options.userId,
            limit: postLimit,
            offset: offset,
          })
        );
    }
  }

  async getRecentPosts(userId: number): Promise<RecentPost[]> {
    //get recent post vists by user
    return this.prisma.$queryRaw(findRecentVisitsByUser(userId));
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
        updatedDate: new Date(),
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

    const prevVote = await this.prisma.postVote.findOne({
      where: {
        postId_userId: {
          postId: args.postId,
          userId: userId,
        },
      },
    });

    //add vote
    await this.prisma.postVote.upsert({
      where: {
        postId_userId: {
          postId: args.postId,
          userId: userId,
        },
      },
      create: {
        updatedDatetime: d,
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
        updatedDatetime: d,
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
        userId: true,
      },
    });

    //check the nature of the vote
    const karmaDifference = args.vote - (prevVote ? prevVote.voteType : 0);

    //update karma of the author
    await this.prisma.user.update({
      where: {
        id: post.userId,
      },
      data: {
        karma: {
          increment: karmaDifference,
        },
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
