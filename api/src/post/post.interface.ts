import { Group, Post, PostComment } from '@prisma/client';
import { VoteType } from '../core/enums/vote-type';

export interface TimelinePost extends Post {
  user: { id: number; username: string };
  comments: number;
  group: Group;
  votes: {
    count: number;
    userVoteType: VoteType;
  };
}

export interface SinglePost extends Post {
  user: { id: number; username: string };
  comments: PostComment[];
  group: Group;
  votes: {
    count: number;
    userVoteType: VoteType;
  };
}
