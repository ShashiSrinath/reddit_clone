import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { VoteType } from '../core/enums/vote-type';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  groupId: number;
}

export class UpdatePostDto {
  @IsNumber()
  postId: number;

  @IsString()
  content: string;
}

export class AddVoteDto {
  @IsNumber()
  postId: number;

  @IsEnum([VoteType.downvote, VoteType.neutral, VoteType.upvote])
  vote: VoteType;
}
