import { PostVote } from '@prisma/client';
import { VoteType } from '../../core/enums/vote-type';

export const getVotes = (votes: PostVote[], userId?: number) => {
  let count = 0;
  let userVoteType = VoteType.neutral;
  votes.forEach((v) => {
    count += v.voteType;
    if (userId && v.userId === userId) {
      userVoteType = v.voteType;
    }
  });
  return { count: count, userVoteType: userVoteType };
};
