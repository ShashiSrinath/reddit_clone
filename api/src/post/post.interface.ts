import { Group, Post, PostComment } from '../../lib/prisma-types';
import { VoteType } from '../core/enums/vote-type';

export interface TimelinePost extends Post {
  commentCount: number;
  voteCount: number;
  currentUserVoteType: number;
  group: {
    id: number;
    name: string;
  };
  user: { id: number; username: string };
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

export interface RecentPost {
  id: number;
  title: string;
  group: {
    id: number;
    name: string;
  };
  commentCount: number;
  voteCount: number;
  visitedTime: string;
}
