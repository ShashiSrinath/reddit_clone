export enum PostSortType {
  hot = 'hot',
  new = 'new',
}

export type FindPostWhereType =
  | {
      by: 'group_id';
      groupId: number;
    }
  | {
      by: 'user_id';
      userId: number;
    };

export const findAndSortByHotQuery = (options: {
  where?: FindPostWhereType;
  offset: number;
  limit: number;
  reqUser?: number;
}) => `
   SELECT 
   post.id,
   post.group_id as groupId,
   post.user_id as userId,
   post.title,
   post.content,
   post.media,
   post.created_date as "createdDate",
   post.updated_date as "updatedDate",
   
    
   json_build_object('id',userT.id, 'username', userT.username) as "user",
   json_build_object('id', groupT.id, 'name', groupT.name) as "group",
   
   
   COALESCE((select pv.vote_type from "PostVote" pv where pv.post_id = post.id and pv.user_id = ${
     options.reqUser ? options.reqUser : -1
   }),0) as "currentUserVoteType",
   (select COUNT(*) from "PostComment" pc where pc.post_id = post.id) as "commentCount",
   COALESCE(SUM(postVote.vote_type),0) as "voteCount",
   
   (LOG(
      CASE WHEN ABS(COALESCE(SUM(postVote.vote_type),0)) < 1 THEN 1 
      ELSE ABS(SUM(postVote.vote_type)) END
   )
    * (CASE WHEN SUM(postVote.vote_type) < 0 THEN -1 ELSE 1 END)::INTEGER
    - (EXTRACT(epoch from (CURRENT_TIMESTAMP - post.created_date)) / 43200))::FLOAT4  AS hot_rank
   
   FROM "Post" post
   LEFT JOIN "PostVote" postVote on postVote.post_id = post.id
   LEFT JOIN "User" userT on userT.id = post.user_id
   LEFT JOIN "Group" groupT on groupT.id = post.group_id
   ${
     options.where && options.where.by === 'group_id'
       ? `WHERE post.group_id = ${options.where.groupId}`
       : ''
   }
    ${
      options.where && options.where.by === 'user_id'
        ? `WHERE post.user_id = ${options.where.userId}`
        : ''
    }
   GROUP BY post.id ,userT.id,groupT.id
   ORDER BY hot_rank  desc, post.created_date desc
`;

export const findAndSortByNewQuery = (options: {
  where?: FindPostWhereType;
  offset: number;
  limit: number;
  reqUser?: number;
}) => `
   SELECT 
   post.id,
   post.group_id as groupId,
   post.user_id as userId,
   post.title,
   post.content,
   post.media,
   post.created_date as "createdDate",
   post.updated_date as "updatedDate",
   
    
   json_build_object('id',userT.id, 'username', userT.username) as "user",
   json_build_object('id', groupT.id, 'name', groupT.name) as "group",
   
   
   COALESCE((select pv.vote_type from "PostVote" pv where pv.post_id = post.id and pv.user_id = ${
     options.reqUser ? options.reqUser : -1
   }),0) as "currentUserVoteType",
   (select COUNT(*) from "PostComment" pc where pc.post_id = post.id) as "commentCount",
   COALESCE(SUM(postVote.vote_type),0) as "voteCount"
   
   
   FROM "Post" post
   LEFT JOIN "PostVote" postVote on postVote.post_id = post.id
   LEFT JOIN "User" userT on userT.id = post.user_id
   LEFT JOIN "Group" groupT on groupT.id = post.group_id
   ${
     options.where && options.where.by === 'group_id'
       ? `WHERE post.group_id = ${options.where.groupId}`
       : ''
   }
    ${
      options.where && options.where.by === 'user_id'
        ? `WHERE post.user_id = ${options.where.userId}`
        : ''
    }
   GROUP BY post.id ,userT.id,groupT.id
   ORDER BY post.created_date desc
`;
