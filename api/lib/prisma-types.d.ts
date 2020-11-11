import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
  Sql,
} from '@prisma/client/runtime';

export { PrismaClientKnownRequestError };
export { PrismaClientUnknownRequestError };
export { PrismaClientRustPanicError };
export { PrismaClientInitializationError };
export { PrismaClientValidationError };

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw, Sql };

/**
 * Prisma Client JS version: 2.9.0
 * Query Engine version: 369b3694b7edb869fad14827a33ad3f3f49bbc20
 */
export declare type PrismaVersion = {
  client: string;
};

export declare const prismaVersion: PrismaVersion;

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
 */
export declare type JsonObject = { [Key in string]?: JsonValue };

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonArray;

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = { [Key in string]?: JsonValue };

export declare interface InputJsonArray extends Array<JsonValue> {}

export declare type InputJsonValue =
  | undefined
  | string
  | number
  | boolean
  | null
  | InputJsonObject
  | InputJsonArray;

declare type SelectAndInclude = {
  select: any;
  include: any;
};

declare type HasSelect = {
  select: any;
};

declare type HasInclude = {
  include: any;
};

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S;

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<
  T extends PromiseLike<any>
> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<
  T extends (...args: any) => Promise<any>
> = PromiseType<ReturnType<T>>;

export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key;
}[keyof T];

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>;

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(
    prisma: PrismaClient<any, any>,
    debug?: boolean,
    hooks?: Hooks | undefined
  );
  request<T>(
    document: any,
    dataPath?: string[],
    rootField?: string,
    typeName?: string,
    isList?: boolean,
    callsite?: string
  ): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(
    document: any,
    data: any,
    path: string[],
    rootField?: string,
    isList?: boolean
  ): any;
}

/**
 * Client
 **/

export declare type Datasource = {
  url?: string;
};

export type Datasources = {
  db?: Datasource;
};

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources;

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat;

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   *
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>;
}

export type Hooks = {
  beforeRequest?: (options: {
    query: string;
    path: string[];
    rootField?: string;
    typeName?: string;
    document: any;
  }) => any;
};

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
  level: LogLevel;
  emit: 'stdout' | 'event';
};

export type GetLogType<
  T extends LogLevel | LogDefinition
> = T extends LogDefinition
  ? T['emit'] extends 'event'
    ? T['level']
    : never
  : never;
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition>
  ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never;

export type QueryEvent = {
  timestamp: Date;
  query: string;
  params: string;
  duration: number;
  target: string;
};

export type LogEvent = {
  timestamp: Date;
  message: string;
  target: string;
};
/* End Types for Logging */

export type PrismaAction =
  | 'findOne'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate';

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string;
  action: PrismaAction;
  args: any;
  dataPath: string[];
  runInTransaction: boolean;
};

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>
) => Promise<T>;

// tested in getLogLevel.test.ts
export declare function getLogLevel(
  log: Array<LogLevel | LogDefinition>
): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Groups
 * const groups = await prisma.group.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T
    ? T['log'] extends Array<LogLevel | LogDefinition>
      ? GetEvents<T['log']>
      : never
    : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Groups
   * const groups = await prisma.group.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(
    eventType: V,
    callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void
  ): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(
    eventType: V,
    callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void
  ): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void;

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = any>(
    query: string | TemplateStringsArray,
    ...values: any[]
  ): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(
    query: string | TemplateStringsArray,
    ...values: any[]
  ): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = any>(
    query: string | TemplateStringsArray,
    ...values: any[]
  ): Promise<T>;

  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(
    query: string | TemplateStringsArray,
    ...values: any[]
  ): Promise<T>;

  /**
   * `prisma.group`: Exposes CRUD operations for the **Group** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Groups
   * const groups = await prisma.group.findMany()
   * ```
   */
  get group(): GroupDelegate;

  /**
   * `prisma.groupUser`: Exposes CRUD operations for the **GroupUser** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more GroupUsers
   * const groupUsers = await prisma.groupUser.findMany()
   * ```
   */
  get groupUser(): GroupUserDelegate;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Posts
   * const posts = await prisma.post.findMany()
   * ```
   */
  get post(): PostDelegate;

  /**
   * `prisma.postComment`: Exposes CRUD operations for the **PostComment** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more PostComments
   * const postComments = await prisma.postComment.findMany()
   * ```
   */
  get postComment(): PostCommentDelegate;

  /**
   * `prisma.postCommentVote`: Exposes CRUD operations for the **PostCommentVote** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more PostCommentVotes
   * const postCommentVotes = await prisma.postCommentVote.findMany()
   * ```
   */
  get postCommentVote(): PostCommentVoteDelegate;

  /**
   * `prisma.postVote`: Exposes CRUD operations for the **PostVote** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more PostVotes
   * const postVotes = await prisma.postVote.findMany()
   * ```
   */
  get postVote(): PostVoteDelegate;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): UserDelegate;
}

/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const GroupDistinctFieldEnum: {
  id: 'id';
  name: 'name';
  description: 'description';
  title: 'title';
};

export declare type GroupDistinctFieldEnum = typeof GroupDistinctFieldEnum[keyof typeof GroupDistinctFieldEnum];

export declare const GroupUserDistinctFieldEnum: {
  groupId: 'groupId';
  userId: 'userId';
  role: 'role';
};

export declare type GroupUserDistinctFieldEnum = typeof GroupUserDistinctFieldEnum[keyof typeof GroupUserDistinctFieldEnum];

export declare const PostDistinctFieldEnum: {
  id: 'id';
  groupId: 'groupId';
  userId: 'userId';
  title: 'title';
  content: 'content';
  media: 'media';
  createdDate: 'createdDate';
  updatedDate: 'updatedDate';
};

export declare type PostDistinctFieldEnum = typeof PostDistinctFieldEnum[keyof typeof PostDistinctFieldEnum];

export declare const PostCommentDistinctFieldEnum: {
  id: 'id';
  postId: 'postId';
  userId: 'userId';
  parentCommentId: 'parentCommentId';
  content: 'content';
};

export declare type PostCommentDistinctFieldEnum = typeof PostCommentDistinctFieldEnum[keyof typeof PostCommentDistinctFieldEnum];

export declare const PostCommentVoteDistinctFieldEnum: {
  commentId: 'commentId';
  userId: 'userId';
  createdDatetime: 'createdDatetime';
  voteType: 'voteType';
  updatedDatetime: 'updatedDatetime';
};

export declare type PostCommentVoteDistinctFieldEnum = typeof PostCommentVoteDistinctFieldEnum[keyof typeof PostCommentVoteDistinctFieldEnum];

export declare const PostVoteDistinctFieldEnum: {
  postId: 'postId';
  userId: 'userId';
  createdDatetime: 'createdDatetime';
  voteType: 'voteType';
  updatedDatetime: 'updatedDatetime';
};

export declare type PostVoteDistinctFieldEnum = typeof PostVoteDistinctFieldEnum[keyof typeof PostVoteDistinctFieldEnum];

export declare const UserDistinctFieldEnum: {
  id: 'id';
  username: 'username';
  email: 'email';
  password: 'password';
  karma: 'karma';
  role: 'role';
  emailVerified: 'emailVerified';
};

export declare type UserDistinctFieldEnum = typeof UserDistinctFieldEnum[keyof typeof UserDistinctFieldEnum];

export declare const SortOrder: {
  asc: 'asc';
  desc: 'desc';
};

export declare type SortOrder = typeof SortOrder[keyof typeof SortOrder];

export declare const GroupUserRole: {
  admin: 'admin';
  moderator: 'moderator';
  user: 'user';
};

export declare type GroupUserRole = typeof GroupUserRole[keyof typeof GroupUserRole];

export declare const UserRole: {
  administrator: 'administrator';
  moderator: 'moderator';
  user: 'user';
};

export declare type UserRole = typeof UserRole[keyof typeof UserRole];

export declare const QueryMode: {
  default: 'default';
  insensitive: 'insensitive';
};

export declare type QueryMode = typeof QueryMode[keyof typeof QueryMode];

/**
 * Model Group
 */

export type Group = {
  id: number;
  name: string;
  description: string;
  title: string | null;
};

export type AggregateGroup = {
  count: number;
  avg: GroupAvgAggregateOutputType | null;
  sum: GroupSumAggregateOutputType | null;
  min: GroupMinAggregateOutputType | null;
  max: GroupMaxAggregateOutputType | null;
};

export type GroupAvgAggregateOutputType = {
  id: number;
};

export type GroupSumAggregateOutputType = {
  id: number;
};

export type GroupMinAggregateOutputType = {
  id: number;
};

export type GroupMaxAggregateOutputType = {
  id: number;
};

export type GroupAvgAggregateInputType = {
  id?: true;
};

export type GroupSumAggregateInputType = {
  id?: true;
};

export type GroupMinAggregateInputType = {
  id?: true;
};

export type GroupMaxAggregateInputType = {
  id?: true;
};

export type AggregateGroupArgs = {
  where?: GroupWhereInput;
  orderBy?: Enumerable<GroupOrderByInput> | GroupOrderByInput;
  cursor?: GroupWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<GroupDistinctFieldEnum>;
  count?: true;
  avg?: GroupAvgAggregateInputType;
  sum?: GroupSumAggregateInputType;
  min?: GroupMinAggregateInputType;
  max?: GroupMaxAggregateInputType;
};

export type GetGroupAggregateType<T extends AggregateGroupArgs> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetGroupAggregateScalarType<T[P]>;
};

export type GetGroupAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof GroupAvgAggregateOutputType
    ? GroupAvgAggregateOutputType[P]
    : never;
};

export type GroupSelect = {
  id?: boolean;
  name?: boolean;
  description?: boolean;
  title?: boolean;
  users?: boolean | FindManyGroupUserArgs;
  posts?: boolean | FindManyPostArgs;
};

export type GroupInclude = {
  users?: boolean | FindManyGroupUserArgs;
  posts?: boolean | FindManyPostArgs;
};

export type GroupGetPayload<
  S extends boolean | null | undefined | GroupArgs,
  U = keyof S
> = S extends true
  ? Group
  : S extends undefined
  ? never
  : S extends GroupArgs | FindManyGroupArgs
  ? 'include' extends U
    ? Group &
        {
          [P in TrueKeys<S['include']>]: P extends 'users'
            ? Array<GroupUserGetPayload<S['include'][P]>>
            : P extends 'posts'
            ? Array<PostGetPayload<S['include'][P]>>
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof Group
          ? Group[P]
          : P extends 'users'
          ? Array<GroupUserGetPayload<S['select'][P]>>
          : P extends 'posts'
          ? Array<PostGetPayload<S['select'][P]>>
          : never;
      }
    : Group
  : Group;

export interface GroupDelegate {
  /**
   * Find zero or one Group that matches the filter.
   * @param {FindOneGroupArgs} args - Arguments to find a Group
   * @example
   * // Get one Group
   * const group = await prisma.group.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneGroupArgs>(
    args: Subset<T, FindOneGroupArgs>
  ): CheckSelect<
    T,
    Prisma__GroupClient<Group | null>,
    Prisma__GroupClient<GroupGetPayload<T> | null>
  >;
  /**
   * Find the first Group that matches the filter.
   * @param {FindFirstGroupArgs} args - Arguments to find a Group
   * @example
   * // Get one Group
   * const group = await prisma.group.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findFirst<T extends FindFirstGroupArgs>(
    args?: Subset<T, FindFirstGroupArgs>
  ): CheckSelect<
    T,
    Prisma__GroupClient<Group | null>,
    Prisma__GroupClient<GroupGetPayload<T> | null>
  >;
  /**
   * Find zero or more Groups that matches the filter.
   * @param {FindManyGroupArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Groups
   * const groups = await prisma.group.findMany()
   *
   * // Get first 10 Groups
   * const groups = await prisma.group.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const groupWithIdOnly = await prisma.group.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyGroupArgs>(
    args?: Subset<T, FindManyGroupArgs>
  ): CheckSelect<T, Promise<Array<Group>>, Promise<Array<GroupGetPayload<T>>>>;
  /**
   * Create a Group.
   * @param {GroupCreateArgs} args - Arguments to create a Group.
   * @example
   * // Create one Group
   * const Group = await prisma.group.create({
   *   data: {
   *     // ... data to create a Group
   *   }
   * })
   *
   **/
  create<T extends GroupCreateArgs>(
    args: Subset<T, GroupCreateArgs>
  ): CheckSelect<
    T,
    Prisma__GroupClient<Group>,
    Prisma__GroupClient<GroupGetPayload<T>>
  >;
  /**
   * Delete a Group.
   * @param {GroupDeleteArgs} args - Arguments to delete one Group.
   * @example
   * // Delete one Group
   * const Group = await prisma.group.delete({
   *   where: {
   *     // ... filter to delete one Group
   *   }
   * })
   *
   **/
  delete<T extends GroupDeleteArgs>(
    args: Subset<T, GroupDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__GroupClient<Group>,
    Prisma__GroupClient<GroupGetPayload<T>>
  >;
  /**
   * Update one Group.
   * @param {GroupUpdateArgs} args - Arguments to update one Group.
   * @example
   * // Update one Group
   * const group = await prisma.group.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends GroupUpdateArgs>(
    args: Subset<T, GroupUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__GroupClient<Group>,
    Prisma__GroupClient<GroupGetPayload<T>>
  >;
  /**
   * Delete zero or more Groups.
   * @param {GroupDeleteManyArgs} args - Arguments to filter Groups to delete.
   * @example
   * // Delete a few Groups
   * const { count } = await prisma.group.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends GroupDeleteManyArgs>(
    args: Subset<T, GroupDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more Groups.
   * @param {GroupUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Groups
   * const group = await prisma.group.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends GroupUpdateManyArgs>(
    args: Subset<T, GroupUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one Group.
   * @param {GroupUpsertArgs} args - Arguments to update or create a Group.
   * @example
   * // Update or create a Group
   * const group = await prisma.group.upsert({
   *   create: {
   *     // ... data to create a Group
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Group we want to update
   *   }
   * })
   **/
  upsert<T extends GroupUpsertArgs>(
    args: Subset<T, GroupUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__GroupClient<Group>,
    Prisma__GroupClient<GroupGetPayload<T>>
  >;
  /**
   * Count
   */
  count(args?: Omit<FindManyGroupArgs, 'select' | 'include'>): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateGroupArgs>(
    args: Subset<T, AggregateGroupArgs>
  ): Promise<GetGroupAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for Group.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__GroupClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  users<T extends FindManyGroupUserArgs = {}>(
    args?: Subset<T, FindManyGroupUserArgs>
  ): CheckSelect<
    T,
    Promise<Array<GroupUser>>,
    Promise<Array<GroupUserGetPayload<T>>>
  >;

  posts<T extends FindManyPostArgs = {}>(
    args?: Subset<T, FindManyPostArgs>
  ): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Group findOne
 */
export type FindOneGroupArgs = {
  /**
   * Select specific fields to fetch from the Group
   **/
  select?: GroupSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: GroupInclude | null;
  /**
   * Filter, which Group to fetch.
   **/
  where: GroupWhereUniqueInput;
};

/**
 * Group findFirst
 */
export type FindFirstGroupArgs = {
  /**
   * Select specific fields to fetch from the Group
   **/
  select?: GroupSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: GroupInclude | null;
  /**
   * Filter, which Group to fetch.
   **/
  where?: GroupWhereInput;
  orderBy?: Enumerable<GroupOrderByInput> | GroupOrderByInput;
  cursor?: GroupWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<GroupDistinctFieldEnum>;
};

/**
 * Group findMany
 */
export type FindManyGroupArgs = {
  /**
   * Select specific fields to fetch from the Group
   **/
  select?: GroupSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: GroupInclude | null;
  /**
   * Filter, which Groups to fetch.
   **/
  where?: GroupWhereInput;
  /**
   * Determine the order of the Groups to fetch.
   **/
  orderBy?: Enumerable<GroupOrderByInput> | GroupOrderByInput;
  /**
   * Sets the position for listing Groups.
   **/
  cursor?: GroupWhereUniqueInput;
  /**
   * The number of Groups to fetch. If negative number, it will take Groups before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` Groups.
   **/
  skip?: number;
  distinct?: Enumerable<GroupDistinctFieldEnum>;
};

/**
 * Group create
 */
export type GroupCreateArgs = {
  /**
   * Select specific fields to fetch from the Group
   **/
  select?: GroupSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: GroupInclude | null;
  /**
   * The data needed to create a Group.
   **/
  data: GroupCreateInput;
};

/**
 * Group update
 */
export type GroupUpdateArgs = {
  /**
   * Select specific fields to fetch from the Group
   **/
  select?: GroupSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: GroupInclude | null;
  /**
   * The data needed to update a Group.
   **/
  data: GroupUpdateInput;
  /**
   * Choose, which Group to update.
   **/
  where: GroupWhereUniqueInput;
};

/**
 * Group updateMany
 */
export type GroupUpdateManyArgs = {
  data: GroupUpdateManyMutationInput;
  where?: GroupWhereInput;
};

/**
 * Group upsert
 */
export type GroupUpsertArgs = {
  /**
   * Select specific fields to fetch from the Group
   **/
  select?: GroupSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: GroupInclude | null;
  /**
   * The filter to search for the Group to update in case it exists.
   **/
  where: GroupWhereUniqueInput;
  /**
   * In case the Group found by the `where` argument doesn't exist, create a new Group with this data.
   **/
  create: GroupCreateInput;
  /**
   * In case the Group was found with the provided `where` argument, update it with this data.
   **/
  update: GroupUpdateInput;
};

/**
 * Group delete
 */
export type GroupDeleteArgs = {
  /**
   * Select specific fields to fetch from the Group
   **/
  select?: GroupSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: GroupInclude | null;
  /**
   * Filter which Group to delete.
   **/
  where: GroupWhereUniqueInput;
};

/**
 * Group deleteMany
 */
export type GroupDeleteManyArgs = {
  where?: GroupWhereInput;
};

/**
 * Group without action
 */
export type GroupArgs = {
  /**
   * Select specific fields to fetch from the Group
   **/
  select?: GroupSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: GroupInclude | null;
};

/**
 * Model GroupUser
 */

export type GroupUser = {
  groupId: number;
  userId: number;
  role: GroupUserRole | null;
};

export type AggregateGroupUser = {
  count: number;
  avg: GroupUserAvgAggregateOutputType | null;
  sum: GroupUserSumAggregateOutputType | null;
  min: GroupUserMinAggregateOutputType | null;
  max: GroupUserMaxAggregateOutputType | null;
};

export type GroupUserAvgAggregateOutputType = {
  groupId: number;
  userId: number;
};

export type GroupUserSumAggregateOutputType = {
  groupId: number;
  userId: number;
};

export type GroupUserMinAggregateOutputType = {
  groupId: number;
  userId: number;
};

export type GroupUserMaxAggregateOutputType = {
  groupId: number;
  userId: number;
};

export type GroupUserAvgAggregateInputType = {
  groupId?: true;
  userId?: true;
};

export type GroupUserSumAggregateInputType = {
  groupId?: true;
  userId?: true;
};

export type GroupUserMinAggregateInputType = {
  groupId?: true;
  userId?: true;
};

export type GroupUserMaxAggregateInputType = {
  groupId?: true;
  userId?: true;
};

export type AggregateGroupUserArgs = {
  where?: GroupUserWhereInput;
  orderBy?: Enumerable<GroupUserOrderByInput> | GroupUserOrderByInput;
  cursor?: GroupUserWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<GroupUserDistinctFieldEnum>;
  count?: true;
  avg?: GroupUserAvgAggregateInputType;
  sum?: GroupUserSumAggregateInputType;
  min?: GroupUserMinAggregateInputType;
  max?: GroupUserMaxAggregateInputType;
};

export type GetGroupUserAggregateType<T extends AggregateGroupUserArgs> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetGroupUserAggregateScalarType<T[P]>;
};

export type GetGroupUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof GroupUserAvgAggregateOutputType
    ? GroupUserAvgAggregateOutputType[P]
    : never;
};

export type GroupUserSelect = {
  groupId?: boolean;
  userId?: boolean;
  role?: boolean;
  group?: boolean | GroupArgs;
  user?: boolean | UserArgs;
};

export type GroupUserInclude = {
  group?: boolean | GroupArgs;
  user?: boolean | UserArgs;
};

export type GroupUserGetPayload<
  S extends boolean | null | undefined | GroupUserArgs,
  U = keyof S
> = S extends true
  ? GroupUser
  : S extends undefined
  ? never
  : S extends GroupUserArgs | FindManyGroupUserArgs
  ? 'include' extends U
    ? GroupUser &
        {
          [P in TrueKeys<S['include']>]: P extends 'group'
            ? GroupGetPayload<S['include'][P]>
            : P extends 'user'
            ? UserGetPayload<S['include'][P]>
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof GroupUser
          ? GroupUser[P]
          : P extends 'group'
          ? GroupGetPayload<S['select'][P]>
          : P extends 'user'
          ? UserGetPayload<S['select'][P]>
          : never;
      }
    : GroupUser
  : GroupUser;

export interface GroupUserDelegate {
  /**
   * Find zero or one GroupUser that matches the filter.
   * @param {FindOneGroupUserArgs} args - Arguments to find a GroupUser
   * @example
   * // Get one GroupUser
   * const groupUser = await prisma.groupUser.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneGroupUserArgs>(
    args: Subset<T, FindOneGroupUserArgs>
  ): CheckSelect<
    T,
    Prisma__GroupUserClient<GroupUser | null>,
    Prisma__GroupUserClient<GroupUserGetPayload<T> | null>
  >;
  /**
   * Find the first GroupUser that matches the filter.
   * @param {FindFirstGroupUserArgs} args - Arguments to find a GroupUser
   * @example
   * // Get one GroupUser
   * const groupUser = await prisma.groupUser.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findFirst<T extends FindFirstGroupUserArgs>(
    args?: Subset<T, FindFirstGroupUserArgs>
  ): CheckSelect<
    T,
    Prisma__GroupUserClient<GroupUser | null>,
    Prisma__GroupUserClient<GroupUserGetPayload<T> | null>
  >;
  /**
   * Find zero or more GroupUsers that matches the filter.
   * @param {FindManyGroupUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all GroupUsers
   * const groupUsers = await prisma.groupUser.findMany()
   *
   * // Get first 10 GroupUsers
   * const groupUsers = await prisma.groupUser.findMany({ take: 10 })
   *
   * // Only select the `groupId`
   * const groupUserWithGroupIdOnly = await prisma.groupUser.findMany({ select: { groupId: true } })
   *
   **/
  findMany<T extends FindManyGroupUserArgs>(
    args?: Subset<T, FindManyGroupUserArgs>
  ): CheckSelect<
    T,
    Promise<Array<GroupUser>>,
    Promise<Array<GroupUserGetPayload<T>>>
  >;
  /**
   * Create a GroupUser.
   * @param {GroupUserCreateArgs} args - Arguments to create a GroupUser.
   * @example
   * // Create one GroupUser
   * const GroupUser = await prisma.groupUser.create({
   *   data: {
   *     // ... data to create a GroupUser
   *   }
   * })
   *
   **/
  create<T extends GroupUserCreateArgs>(
    args: Subset<T, GroupUserCreateArgs>
  ): CheckSelect<
    T,
    Prisma__GroupUserClient<GroupUser>,
    Prisma__GroupUserClient<GroupUserGetPayload<T>>
  >;
  /**
   * Delete a GroupUser.
   * @param {GroupUserDeleteArgs} args - Arguments to delete one GroupUser.
   * @example
   * // Delete one GroupUser
   * const GroupUser = await prisma.groupUser.delete({
   *   where: {
   *     // ... filter to delete one GroupUser
   *   }
   * })
   *
   **/
  delete<T extends GroupUserDeleteArgs>(
    args: Subset<T, GroupUserDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__GroupUserClient<GroupUser>,
    Prisma__GroupUserClient<GroupUserGetPayload<T>>
  >;
  /**
   * Update one GroupUser.
   * @param {GroupUserUpdateArgs} args - Arguments to update one GroupUser.
   * @example
   * // Update one GroupUser
   * const groupUser = await prisma.groupUser.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends GroupUserUpdateArgs>(
    args: Subset<T, GroupUserUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__GroupUserClient<GroupUser>,
    Prisma__GroupUserClient<GroupUserGetPayload<T>>
  >;
  /**
   * Delete zero or more GroupUsers.
   * @param {GroupUserDeleteManyArgs} args - Arguments to filter GroupUsers to delete.
   * @example
   * // Delete a few GroupUsers
   * const { count } = await prisma.groupUser.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends GroupUserDeleteManyArgs>(
    args: Subset<T, GroupUserDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more GroupUsers.
   * @param {GroupUserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many GroupUsers
   * const groupUser = await prisma.groupUser.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends GroupUserUpdateManyArgs>(
    args: Subset<T, GroupUserUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one GroupUser.
   * @param {GroupUserUpsertArgs} args - Arguments to update or create a GroupUser.
   * @example
   * // Update or create a GroupUser
   * const groupUser = await prisma.groupUser.upsert({
   *   create: {
   *     // ... data to create a GroupUser
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the GroupUser we want to update
   *   }
   * })
   **/
  upsert<T extends GroupUserUpsertArgs>(
    args: Subset<T, GroupUserUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__GroupUserClient<GroupUser>,
    Prisma__GroupUserClient<GroupUserGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyGroupUserArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateGroupUserArgs>(
    args: Subset<T, AggregateGroupUserArgs>
  ): Promise<GetGroupUserAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for GroupUser.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__GroupUserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  group<T extends GroupArgs = {}>(
    args?: Subset<T, GroupArgs>
  ): CheckSelect<
    T,
    Prisma__GroupClient<Group | null>,
    Prisma__GroupClient<GroupGetPayload<T> | null>
  >;

  user<T extends UserArgs = {}>(
    args?: Subset<T, UserArgs>
  ): CheckSelect<
    T,
    Prisma__UserClient<User | null>,
    Prisma__UserClient<UserGetPayload<T> | null>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * GroupUser findOne
 */
export type FindOneGroupUserArgs = {
  /**
   * Select specific fields to fetch from the GroupUser
   **/
  select?: GroupUserSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: GroupUserInclude | null;
  /**
   * Filter, which GroupUser to fetch.
   **/
  where: GroupUserWhereUniqueInput;
};

/**
 * GroupUser findFirst
 */
export type FindFirstGroupUserArgs = {
  /**
   * Select specific fields to fetch from the GroupUser
   **/
  select?: GroupUserSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: GroupUserInclude | null;
  /**
   * Filter, which GroupUser to fetch.
   **/
  where?: GroupUserWhereInput;
  orderBy?: Enumerable<GroupUserOrderByInput> | GroupUserOrderByInput;
  cursor?: GroupUserWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<GroupUserDistinctFieldEnum>;
};

/**
 * GroupUser findMany
 */
export type FindManyGroupUserArgs = {
  /**
   * Select specific fields to fetch from the GroupUser
   **/
  select?: GroupUserSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: GroupUserInclude | null;
  /**
   * Filter, which GroupUsers to fetch.
   **/
  where?: GroupUserWhereInput;
  /**
   * Determine the order of the GroupUsers to fetch.
   **/
  orderBy?: Enumerable<GroupUserOrderByInput> | GroupUserOrderByInput;
  /**
   * Sets the position for listing GroupUsers.
   **/
  cursor?: GroupUserWhereUniqueInput;
  /**
   * The number of GroupUsers to fetch. If negative number, it will take GroupUsers before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` GroupUsers.
   **/
  skip?: number;
  distinct?: Enumerable<GroupUserDistinctFieldEnum>;
};

/**
 * GroupUser create
 */
export type GroupUserCreateArgs = {
  /**
   * Select specific fields to fetch from the GroupUser
   **/
  select?: GroupUserSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: GroupUserInclude | null;
  /**
   * The data needed to create a GroupUser.
   **/
  data: GroupUserCreateInput;
};

/**
 * GroupUser update
 */
export type GroupUserUpdateArgs = {
  /**
   * Select specific fields to fetch from the GroupUser
   **/
  select?: GroupUserSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: GroupUserInclude | null;
  /**
   * The data needed to update a GroupUser.
   **/
  data: GroupUserUpdateInput;
  /**
   * Choose, which GroupUser to update.
   **/
  where: GroupUserWhereUniqueInput;
};

/**
 * GroupUser updateMany
 */
export type GroupUserUpdateManyArgs = {
  data: GroupUserUpdateManyMutationInput;
  where?: GroupUserWhereInput;
};

/**
 * GroupUser upsert
 */
export type GroupUserUpsertArgs = {
  /**
   * Select specific fields to fetch from the GroupUser
   **/
  select?: GroupUserSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: GroupUserInclude | null;
  /**
   * The filter to search for the GroupUser to update in case it exists.
   **/
  where: GroupUserWhereUniqueInput;
  /**
   * In case the GroupUser found by the `where` argument doesn't exist, create a new GroupUser with this data.
   **/
  create: GroupUserCreateInput;
  /**
   * In case the GroupUser was found with the provided `where` argument, update it with this data.
   **/
  update: GroupUserUpdateInput;
};

/**
 * GroupUser delete
 */
export type GroupUserDeleteArgs = {
  /**
   * Select specific fields to fetch from the GroupUser
   **/
  select?: GroupUserSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: GroupUserInclude | null;
  /**
   * Filter which GroupUser to delete.
   **/
  where: GroupUserWhereUniqueInput;
};

/**
 * GroupUser deleteMany
 */
export type GroupUserDeleteManyArgs = {
  where?: GroupUserWhereInput;
};

/**
 * GroupUser without action
 */
export type GroupUserArgs = {
  /**
   * Select specific fields to fetch from the GroupUser
   **/
  select?: GroupUserSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: GroupUserInclude | null;
};

/**
 * Model Post
 */

export type Post = {
  id: number;
  groupId: number;
  userId: number;
  title: string;
  content: string;
  media: string | null;
  createdDate: Date;
  updatedDate: Date;
};

export type AggregatePost = {
  count: number;
  avg: PostAvgAggregateOutputType | null;
  sum: PostSumAggregateOutputType | null;
  min: PostMinAggregateOutputType | null;
  max: PostMaxAggregateOutputType | null;
};

export type PostAvgAggregateOutputType = {
  id: number;
  groupId: number;
  userId: number;
};

export type PostSumAggregateOutputType = {
  id: number;
  groupId: number;
  userId: number;
};

export type PostMinAggregateOutputType = {
  id: number;
  groupId: number;
  userId: number;
};

export type PostMaxAggregateOutputType = {
  id: number;
  groupId: number;
  userId: number;
};

export type PostAvgAggregateInputType = {
  id?: true;
  groupId?: true;
  userId?: true;
};

export type PostSumAggregateInputType = {
  id?: true;
  groupId?: true;
  userId?: true;
};

export type PostMinAggregateInputType = {
  id?: true;
  groupId?: true;
  userId?: true;
};

export type PostMaxAggregateInputType = {
  id?: true;
  groupId?: true;
  userId?: true;
};

export type AggregatePostArgs = {
  where?: PostWhereInput;
  orderBy?: Enumerable<PostOrderByInput> | PostOrderByInput;
  cursor?: PostWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<PostDistinctFieldEnum>;
  count?: true;
  avg?: PostAvgAggregateInputType;
  sum?: PostSumAggregateInputType;
  min?: PostMinAggregateInputType;
  max?: PostMaxAggregateInputType;
};

export type GetPostAggregateType<T extends AggregatePostArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetPostAggregateScalarType<T[P]>;
};

export type GetPostAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof PostAvgAggregateOutputType
    ? PostAvgAggregateOutputType[P]
    : never;
};

export type PostSelect = {
  id?: boolean;
  groupId?: boolean;
  userId?: boolean;
  title?: boolean;
  content?: boolean;
  media?: boolean;
  createdDate?: boolean;
  updatedDate?: boolean;
  group?: boolean | GroupArgs;
  user?: boolean | UserArgs;
  comments?: boolean | FindManyPostCommentArgs;
  votes?: boolean | FindManyPostVoteArgs;
};

export type PostInclude = {
  group?: boolean | GroupArgs;
  user?: boolean | UserArgs;
  comments?: boolean | FindManyPostCommentArgs;
  votes?: boolean | FindManyPostVoteArgs;
};

export type PostGetPayload<
  S extends boolean | null | undefined | PostArgs,
  U = keyof S
> = S extends true
  ? Post
  : S extends undefined
  ? never
  : S extends PostArgs | FindManyPostArgs
  ? 'include' extends U
    ? Post &
        {
          [P in TrueKeys<S['include']>]: P extends 'group'
            ? GroupGetPayload<S['include'][P]>
            : P extends 'user'
            ? UserGetPayload<S['include'][P]>
            : P extends 'comments'
            ? Array<PostCommentGetPayload<S['include'][P]>>
            : P extends 'votes'
            ? Array<PostVoteGetPayload<S['include'][P]>>
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof Post
          ? Post[P]
          : P extends 'group'
          ? GroupGetPayload<S['select'][P]>
          : P extends 'user'
          ? UserGetPayload<S['select'][P]>
          : P extends 'comments'
          ? Array<PostCommentGetPayload<S['select'][P]>>
          : P extends 'votes'
          ? Array<PostVoteGetPayload<S['select'][P]>>
          : never;
      }
    : Post
  : Post;

export interface PostDelegate {
  /**
   * Find zero or one Post that matches the filter.
   * @param {FindOnePostArgs} args - Arguments to find a Post
   * @example
   * // Get one Post
   * const post = await prisma.post.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOnePostArgs>(
    args: Subset<T, FindOnePostArgs>
  ): CheckSelect<
    T,
    Prisma__PostClient<Post | null>,
    Prisma__PostClient<PostGetPayload<T> | null>
  >;
  /**
   * Find the first Post that matches the filter.
   * @param {FindFirstPostArgs} args - Arguments to find a Post
   * @example
   * // Get one Post
   * const post = await prisma.post.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findFirst<T extends FindFirstPostArgs>(
    args?: Subset<T, FindFirstPostArgs>
  ): CheckSelect<
    T,
    Prisma__PostClient<Post | null>,
    Prisma__PostClient<PostGetPayload<T> | null>
  >;
  /**
   * Find zero or more Posts that matches the filter.
   * @param {FindManyPostArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Posts
   * const posts = await prisma.post.findMany()
   *
   * // Get first 10 Posts
   * const posts = await prisma.post.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyPostArgs>(
    args?: Subset<T, FindManyPostArgs>
  ): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>;
  /**
   * Create a Post.
   * @param {PostCreateArgs} args - Arguments to create a Post.
   * @example
   * // Create one Post
   * const Post = await prisma.post.create({
   *   data: {
   *     // ... data to create a Post
   *   }
   * })
   *
   **/
  create<T extends PostCreateArgs>(
    args: Subset<T, PostCreateArgs>
  ): CheckSelect<
    T,
    Prisma__PostClient<Post>,
    Prisma__PostClient<PostGetPayload<T>>
  >;
  /**
   * Delete a Post.
   * @param {PostDeleteArgs} args - Arguments to delete one Post.
   * @example
   * // Delete one Post
   * const Post = await prisma.post.delete({
   *   where: {
   *     // ... filter to delete one Post
   *   }
   * })
   *
   **/
  delete<T extends PostDeleteArgs>(
    args: Subset<T, PostDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__PostClient<Post>,
    Prisma__PostClient<PostGetPayload<T>>
  >;
  /**
   * Update one Post.
   * @param {PostUpdateArgs} args - Arguments to update one Post.
   * @example
   * // Update one Post
   * const post = await prisma.post.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends PostUpdateArgs>(
    args: Subset<T, PostUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__PostClient<Post>,
    Prisma__PostClient<PostGetPayload<T>>
  >;
  /**
   * Delete zero or more Posts.
   * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
   * @example
   * // Delete a few Posts
   * const { count } = await prisma.post.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends PostDeleteManyArgs>(
    args: Subset<T, PostDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more Posts.
   * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Posts
   * const post = await prisma.post.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends PostUpdateManyArgs>(
    args: Subset<T, PostUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one Post.
   * @param {PostUpsertArgs} args - Arguments to update or create a Post.
   * @example
   * // Update or create a Post
   * const post = await prisma.post.upsert({
   *   create: {
   *     // ... data to create a Post
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Post we want to update
   *   }
   * })
   **/
  upsert<T extends PostUpsertArgs>(
    args: Subset<T, PostUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__PostClient<Post>,
    Prisma__PostClient<PostGetPayload<T>>
  >;
  /**
   * Count
   */
  count(args?: Omit<FindManyPostArgs, 'select' | 'include'>): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregatePostArgs>(
    args: Subset<T, AggregatePostArgs>
  ): Promise<GetPostAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for Post.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__PostClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  group<T extends GroupArgs = {}>(
    args?: Subset<T, GroupArgs>
  ): CheckSelect<
    T,
    Prisma__GroupClient<Group | null>,
    Prisma__GroupClient<GroupGetPayload<T> | null>
  >;

  user<T extends UserArgs = {}>(
    args?: Subset<T, UserArgs>
  ): CheckSelect<
    T,
    Prisma__UserClient<User | null>,
    Prisma__UserClient<UserGetPayload<T> | null>
  >;

  comments<T extends FindManyPostCommentArgs = {}>(
    args?: Subset<T, FindManyPostCommentArgs>
  ): CheckSelect<
    T,
    Promise<Array<PostComment>>,
    Promise<Array<PostCommentGetPayload<T>>>
  >;

  votes<T extends FindManyPostVoteArgs = {}>(
    args?: Subset<T, FindManyPostVoteArgs>
  ): CheckSelect<
    T,
    Promise<Array<PostVote>>,
    Promise<Array<PostVoteGetPayload<T>>>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Post findOne
 */
export type FindOnePostArgs = {
  /**
   * Select specific fields to fetch from the Post
   **/
  select?: PostSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostInclude | null;
  /**
   * Filter, which Post to fetch.
   **/
  where: PostWhereUniqueInput;
};

/**
 * Post findFirst
 */
export type FindFirstPostArgs = {
  /**
   * Select specific fields to fetch from the Post
   **/
  select?: PostSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostInclude | null;
  /**
   * Filter, which Post to fetch.
   **/
  where?: PostWhereInput;
  orderBy?: Enumerable<PostOrderByInput> | PostOrderByInput;
  cursor?: PostWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<PostDistinctFieldEnum>;
};

/**
 * Post findMany
 */
export type FindManyPostArgs = {
  /**
   * Select specific fields to fetch from the Post
   **/
  select?: PostSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostInclude | null;
  /**
   * Filter, which Posts to fetch.
   **/
  where?: PostWhereInput;
  /**
   * Determine the order of the Posts to fetch.
   **/
  orderBy?: Enumerable<PostOrderByInput> | PostOrderByInput;
  /**
   * Sets the position for listing Posts.
   **/
  cursor?: PostWhereUniqueInput;
  /**
   * The number of Posts to fetch. If negative number, it will take Posts before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` Posts.
   **/
  skip?: number;
  distinct?: Enumerable<PostDistinctFieldEnum>;
};

/**
 * Post create
 */
export type PostCreateArgs = {
  /**
   * Select specific fields to fetch from the Post
   **/
  select?: PostSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostInclude | null;
  /**
   * The data needed to create a Post.
   **/
  data: PostCreateInput;
};

/**
 * Post update
 */
export type PostUpdateArgs = {
  /**
   * Select specific fields to fetch from the Post
   **/
  select?: PostSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostInclude | null;
  /**
   * The data needed to update a Post.
   **/
  data: PostUpdateInput;
  /**
   * Choose, which Post to update.
   **/
  where: PostWhereUniqueInput;
};

/**
 * Post updateMany
 */
export type PostUpdateManyArgs = {
  data: PostUpdateManyMutationInput;
  where?: PostWhereInput;
};

/**
 * Post upsert
 */
export type PostUpsertArgs = {
  /**
   * Select specific fields to fetch from the Post
   **/
  select?: PostSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostInclude | null;
  /**
   * The filter to search for the Post to update in case it exists.
   **/
  where: PostWhereUniqueInput;
  /**
   * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
   **/
  create: PostCreateInput;
  /**
   * In case the Post was found with the provided `where` argument, update it with this data.
   **/
  update: PostUpdateInput;
};

/**
 * Post delete
 */
export type PostDeleteArgs = {
  /**
   * Select specific fields to fetch from the Post
   **/
  select?: PostSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostInclude | null;
  /**
   * Filter which Post to delete.
   **/
  where: PostWhereUniqueInput;
};

/**
 * Post deleteMany
 */
export type PostDeleteManyArgs = {
  where?: PostWhereInput;
};

/**
 * Post without action
 */
export type PostArgs = {
  /**
   * Select specific fields to fetch from the Post
   **/
  select?: PostSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostInclude | null;
};

/**
 * Model PostComment
 */

export type PostComment = {
  id: number;
  postId: number;
  userId: number;
  parentCommentId: number;
  content: string;
};

export type AggregatePostComment = {
  count: number;
  avg: PostCommentAvgAggregateOutputType | null;
  sum: PostCommentSumAggregateOutputType | null;
  min: PostCommentMinAggregateOutputType | null;
  max: PostCommentMaxAggregateOutputType | null;
};

export type PostCommentAvgAggregateOutputType = {
  id: number;
  postId: number;
  userId: number;
  parentCommentId: number;
};

export type PostCommentSumAggregateOutputType = {
  id: number;
  postId: number;
  userId: number;
  parentCommentId: number;
};

export type PostCommentMinAggregateOutputType = {
  id: number;
  postId: number;
  userId: number;
  parentCommentId: number;
};

export type PostCommentMaxAggregateOutputType = {
  id: number;
  postId: number;
  userId: number;
  parentCommentId: number;
};

export type PostCommentAvgAggregateInputType = {
  id?: true;
  postId?: true;
  userId?: true;
  parentCommentId?: true;
};

export type PostCommentSumAggregateInputType = {
  id?: true;
  postId?: true;
  userId?: true;
  parentCommentId?: true;
};

export type PostCommentMinAggregateInputType = {
  id?: true;
  postId?: true;
  userId?: true;
  parentCommentId?: true;
};

export type PostCommentMaxAggregateInputType = {
  id?: true;
  postId?: true;
  userId?: true;
  parentCommentId?: true;
};

export type AggregatePostCommentArgs = {
  where?: PostCommentWhereInput;
  orderBy?: Enumerable<PostCommentOrderByInput> | PostCommentOrderByInput;
  cursor?: PostCommentWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<PostCommentDistinctFieldEnum>;
  count?: true;
  avg?: PostCommentAvgAggregateInputType;
  sum?: PostCommentSumAggregateInputType;
  min?: PostCommentMinAggregateInputType;
  max?: PostCommentMaxAggregateInputType;
};

export type GetPostCommentAggregateType<T extends AggregatePostCommentArgs> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetPostCommentAggregateScalarType<T[P]>;
};

export type GetPostCommentAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof PostCommentAvgAggregateOutputType
    ? PostCommentAvgAggregateOutputType[P]
    : never;
};

export type PostCommentSelect = {
  id?: boolean;
  postId?: boolean;
  userId?: boolean;
  parentCommentId?: boolean;
  content?: boolean;
  parentComment?: boolean | PostCommentArgs;
  post?: boolean | PostArgs;
  user?: boolean | UserArgs;
  childComments?: boolean | FindManyPostCommentArgs;
  votes?: boolean | FindManyPostCommentVoteArgs;
};

export type PostCommentInclude = {
  parentComment?: boolean | PostCommentArgs;
  post?: boolean | PostArgs;
  user?: boolean | UserArgs;
  childComments?: boolean | FindManyPostCommentArgs;
  votes?: boolean | FindManyPostCommentVoteArgs;
};

export type PostCommentGetPayload<
  S extends boolean | null | undefined | PostCommentArgs,
  U = keyof S
> = S extends true
  ? PostComment
  : S extends undefined
  ? never
  : S extends PostCommentArgs | FindManyPostCommentArgs
  ? 'include' extends U
    ? PostComment &
        {
          [P in TrueKeys<S['include']>]: P extends 'parentComment'
            ? PostCommentGetPayload<S['include'][P]>
            : P extends 'post'
            ? PostGetPayload<S['include'][P]>
            : P extends 'user'
            ? UserGetPayload<S['include'][P]>
            : P extends 'childComments'
            ? Array<PostCommentGetPayload<S['include'][P]>>
            : P extends 'votes'
            ? Array<PostCommentVoteGetPayload<S['include'][P]>>
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof PostComment
          ? PostComment[P]
          : P extends 'parentComment'
          ? PostCommentGetPayload<S['select'][P]>
          : P extends 'post'
          ? PostGetPayload<S['select'][P]>
          : P extends 'user'
          ? UserGetPayload<S['select'][P]>
          : P extends 'childComments'
          ? Array<PostCommentGetPayload<S['select'][P]>>
          : P extends 'votes'
          ? Array<PostCommentVoteGetPayload<S['select'][P]>>
          : never;
      }
    : PostComment
  : PostComment;

export interface PostCommentDelegate {
  /**
   * Find zero or one PostComment that matches the filter.
   * @param {FindOnePostCommentArgs} args - Arguments to find a PostComment
   * @example
   * // Get one PostComment
   * const postComment = await prisma.postComment.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOnePostCommentArgs>(
    args: Subset<T, FindOnePostCommentArgs>
  ): CheckSelect<
    T,
    Prisma__PostCommentClient<PostComment | null>,
    Prisma__PostCommentClient<PostCommentGetPayload<T> | null>
  >;
  /**
   * Find the first PostComment that matches the filter.
   * @param {FindFirstPostCommentArgs} args - Arguments to find a PostComment
   * @example
   * // Get one PostComment
   * const postComment = await prisma.postComment.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findFirst<T extends FindFirstPostCommentArgs>(
    args?: Subset<T, FindFirstPostCommentArgs>
  ): CheckSelect<
    T,
    Prisma__PostCommentClient<PostComment | null>,
    Prisma__PostCommentClient<PostCommentGetPayload<T> | null>
  >;
  /**
   * Find zero or more PostComments that matches the filter.
   * @param {FindManyPostCommentArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all PostComments
   * const postComments = await prisma.postComment.findMany()
   *
   * // Get first 10 PostComments
   * const postComments = await prisma.postComment.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const postCommentWithIdOnly = await prisma.postComment.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyPostCommentArgs>(
    args?: Subset<T, FindManyPostCommentArgs>
  ): CheckSelect<
    T,
    Promise<Array<PostComment>>,
    Promise<Array<PostCommentGetPayload<T>>>
  >;
  /**
   * Create a PostComment.
   * @param {PostCommentCreateArgs} args - Arguments to create a PostComment.
   * @example
   * // Create one PostComment
   * const PostComment = await prisma.postComment.create({
   *   data: {
   *     // ... data to create a PostComment
   *   }
   * })
   *
   **/
  create<T extends PostCommentCreateArgs>(
    args: Subset<T, PostCommentCreateArgs>
  ): CheckSelect<
    T,
    Prisma__PostCommentClient<PostComment>,
    Prisma__PostCommentClient<PostCommentGetPayload<T>>
  >;
  /**
   * Delete a PostComment.
   * @param {PostCommentDeleteArgs} args - Arguments to delete one PostComment.
   * @example
   * // Delete one PostComment
   * const PostComment = await prisma.postComment.delete({
   *   where: {
   *     // ... filter to delete one PostComment
   *   }
   * })
   *
   **/
  delete<T extends PostCommentDeleteArgs>(
    args: Subset<T, PostCommentDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__PostCommentClient<PostComment>,
    Prisma__PostCommentClient<PostCommentGetPayload<T>>
  >;
  /**
   * Update one PostComment.
   * @param {PostCommentUpdateArgs} args - Arguments to update one PostComment.
   * @example
   * // Update one PostComment
   * const postComment = await prisma.postComment.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends PostCommentUpdateArgs>(
    args: Subset<T, PostCommentUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__PostCommentClient<PostComment>,
    Prisma__PostCommentClient<PostCommentGetPayload<T>>
  >;
  /**
   * Delete zero or more PostComments.
   * @param {PostCommentDeleteManyArgs} args - Arguments to filter PostComments to delete.
   * @example
   * // Delete a few PostComments
   * const { count } = await prisma.postComment.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends PostCommentDeleteManyArgs>(
    args: Subset<T, PostCommentDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more PostComments.
   * @param {PostCommentUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many PostComments
   * const postComment = await prisma.postComment.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends PostCommentUpdateManyArgs>(
    args: Subset<T, PostCommentUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one PostComment.
   * @param {PostCommentUpsertArgs} args - Arguments to update or create a PostComment.
   * @example
   * // Update or create a PostComment
   * const postComment = await prisma.postComment.upsert({
   *   create: {
   *     // ... data to create a PostComment
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the PostComment we want to update
   *   }
   * })
   **/
  upsert<T extends PostCommentUpsertArgs>(
    args: Subset<T, PostCommentUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__PostCommentClient<PostComment>,
    Prisma__PostCommentClient<PostCommentGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyPostCommentArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregatePostCommentArgs>(
    args: Subset<T, AggregatePostCommentArgs>
  ): Promise<GetPostCommentAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for PostComment.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__PostCommentClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  parentComment<T extends PostCommentArgs = {}>(
    args?: Subset<T, PostCommentArgs>
  ): CheckSelect<
    T,
    Prisma__PostCommentClient<PostComment | null>,
    Prisma__PostCommentClient<PostCommentGetPayload<T> | null>
  >;

  post<T extends PostArgs = {}>(
    args?: Subset<T, PostArgs>
  ): CheckSelect<
    T,
    Prisma__PostClient<Post | null>,
    Prisma__PostClient<PostGetPayload<T> | null>
  >;

  user<T extends UserArgs = {}>(
    args?: Subset<T, UserArgs>
  ): CheckSelect<
    T,
    Prisma__UserClient<User | null>,
    Prisma__UserClient<UserGetPayload<T> | null>
  >;

  childComments<T extends FindManyPostCommentArgs = {}>(
    args?: Subset<T, FindManyPostCommentArgs>
  ): CheckSelect<
    T,
    Promise<Array<PostComment>>,
    Promise<Array<PostCommentGetPayload<T>>>
  >;

  votes<T extends FindManyPostCommentVoteArgs = {}>(
    args?: Subset<T, FindManyPostCommentVoteArgs>
  ): CheckSelect<
    T,
    Promise<Array<PostCommentVote>>,
    Promise<Array<PostCommentVoteGetPayload<T>>>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * PostComment findOne
 */
export type FindOnePostCommentArgs = {
  /**
   * Select specific fields to fetch from the PostComment
   **/
  select?: PostCommentSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostCommentInclude | null;
  /**
   * Filter, which PostComment to fetch.
   **/
  where: PostCommentWhereUniqueInput;
};

/**
 * PostComment findFirst
 */
export type FindFirstPostCommentArgs = {
  /**
   * Select specific fields to fetch from the PostComment
   **/
  select?: PostCommentSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostCommentInclude | null;
  /**
   * Filter, which PostComment to fetch.
   **/
  where?: PostCommentWhereInput;
  orderBy?: Enumerable<PostCommentOrderByInput> | PostCommentOrderByInput;
  cursor?: PostCommentWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<PostCommentDistinctFieldEnum>;
};

/**
 * PostComment findMany
 */
export type FindManyPostCommentArgs = {
  /**
   * Select specific fields to fetch from the PostComment
   **/
  select?: PostCommentSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostCommentInclude | null;
  /**
   * Filter, which PostComments to fetch.
   **/
  where?: PostCommentWhereInput;
  /**
   * Determine the order of the PostComments to fetch.
   **/
  orderBy?: Enumerable<PostCommentOrderByInput> | PostCommentOrderByInput;
  /**
   * Sets the position for listing PostComments.
   **/
  cursor?: PostCommentWhereUniqueInput;
  /**
   * The number of PostComments to fetch. If negative number, it will take PostComments before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` PostComments.
   **/
  skip?: number;
  distinct?: Enumerable<PostCommentDistinctFieldEnum>;
};

/**
 * PostComment create
 */
export type PostCommentCreateArgs = {
  /**
   * Select specific fields to fetch from the PostComment
   **/
  select?: PostCommentSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostCommentInclude | null;
  /**
   * The data needed to create a PostComment.
   **/
  data: PostCommentCreateInput;
};

/**
 * PostComment update
 */
export type PostCommentUpdateArgs = {
  /**
   * Select specific fields to fetch from the PostComment
   **/
  select?: PostCommentSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostCommentInclude | null;
  /**
   * The data needed to update a PostComment.
   **/
  data: PostCommentUpdateInput;
  /**
   * Choose, which PostComment to update.
   **/
  where: PostCommentWhereUniqueInput;
};

/**
 * PostComment updateMany
 */
export type PostCommentUpdateManyArgs = {
  data: PostCommentUpdateManyMutationInput;
  where?: PostCommentWhereInput;
};

/**
 * PostComment upsert
 */
export type PostCommentUpsertArgs = {
  /**
   * Select specific fields to fetch from the PostComment
   **/
  select?: PostCommentSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostCommentInclude | null;
  /**
   * The filter to search for the PostComment to update in case it exists.
   **/
  where: PostCommentWhereUniqueInput;
  /**
   * In case the PostComment found by the `where` argument doesn't exist, create a new PostComment with this data.
   **/
  create: PostCommentCreateInput;
  /**
   * In case the PostComment was found with the provided `where` argument, update it with this data.
   **/
  update: PostCommentUpdateInput;
};

/**
 * PostComment delete
 */
export type PostCommentDeleteArgs = {
  /**
   * Select specific fields to fetch from the PostComment
   **/
  select?: PostCommentSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostCommentInclude | null;
  /**
   * Filter which PostComment to delete.
   **/
  where: PostCommentWhereUniqueInput;
};

/**
 * PostComment deleteMany
 */
export type PostCommentDeleteManyArgs = {
  where?: PostCommentWhereInput;
};

/**
 * PostComment without action
 */
export type PostCommentArgs = {
  /**
   * Select specific fields to fetch from the PostComment
   **/
  select?: PostCommentSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostCommentInclude | null;
};

/**
 * Model PostCommentVote
 */

export type PostCommentVote = {
  commentId: number;
  userId: number;
  createdDatetime: Date;
  voteType: number;
  updatedDatetime: Date;
};

export type AggregatePostCommentVote = {
  count: number;
  avg: PostCommentVoteAvgAggregateOutputType | null;
  sum: PostCommentVoteSumAggregateOutputType | null;
  min: PostCommentVoteMinAggregateOutputType | null;
  max: PostCommentVoteMaxAggregateOutputType | null;
};

export type PostCommentVoteAvgAggregateOutputType = {
  commentId: number;
  userId: number;
  voteType: number;
};

export type PostCommentVoteSumAggregateOutputType = {
  commentId: number;
  userId: number;
  voteType: number;
};

export type PostCommentVoteMinAggregateOutputType = {
  commentId: number;
  userId: number;
  voteType: number;
};

export type PostCommentVoteMaxAggregateOutputType = {
  commentId: number;
  userId: number;
  voteType: number;
};

export type PostCommentVoteAvgAggregateInputType = {
  commentId?: true;
  userId?: true;
  voteType?: true;
};

export type PostCommentVoteSumAggregateInputType = {
  commentId?: true;
  userId?: true;
  voteType?: true;
};

export type PostCommentVoteMinAggregateInputType = {
  commentId?: true;
  userId?: true;
  voteType?: true;
};

export type PostCommentVoteMaxAggregateInputType = {
  commentId?: true;
  userId?: true;
  voteType?: true;
};

export type AggregatePostCommentVoteArgs = {
  where?: PostCommentVoteWhereInput;
  orderBy?:
    | Enumerable<PostCommentVoteOrderByInput>
    | PostCommentVoteOrderByInput;
  cursor?: PostCommentVoteWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<PostCommentVoteDistinctFieldEnum>;
  count?: true;
  avg?: PostCommentVoteAvgAggregateInputType;
  sum?: PostCommentVoteSumAggregateInputType;
  min?: PostCommentVoteMinAggregateInputType;
  max?: PostCommentVoteMaxAggregateInputType;
};

export type GetPostCommentVoteAggregateType<
  T extends AggregatePostCommentVoteArgs
> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetPostCommentVoteAggregateScalarType<T[P]>;
};

export type GetPostCommentVoteAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof PostCommentVoteAvgAggregateOutputType
    ? PostCommentVoteAvgAggregateOutputType[P]
    : never;
};

export type PostCommentVoteSelect = {
  commentId?: boolean;
  userId?: boolean;
  createdDatetime?: boolean;
  voteType?: boolean;
  updatedDatetime?: boolean;
  comment?: boolean | PostCommentArgs;
  user?: boolean | UserArgs;
};

export type PostCommentVoteInclude = {
  comment?: boolean | PostCommentArgs;
  user?: boolean | UserArgs;
};

export type PostCommentVoteGetPayload<
  S extends boolean | null | undefined | PostCommentVoteArgs,
  U = keyof S
> = S extends true
  ? PostCommentVote
  : S extends undefined
  ? never
  : S extends PostCommentVoteArgs | FindManyPostCommentVoteArgs
  ? 'include' extends U
    ? PostCommentVote &
        {
          [P in TrueKeys<S['include']>]: P extends 'comment'
            ? PostCommentGetPayload<S['include'][P]>
            : P extends 'user'
            ? UserGetPayload<S['include'][P]>
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof PostCommentVote
          ? PostCommentVote[P]
          : P extends 'comment'
          ? PostCommentGetPayload<S['select'][P]>
          : P extends 'user'
          ? UserGetPayload<S['select'][P]>
          : never;
      }
    : PostCommentVote
  : PostCommentVote;

export interface PostCommentVoteDelegate {
  /**
   * Find zero or one PostCommentVote that matches the filter.
   * @param {FindOnePostCommentVoteArgs} args - Arguments to find a PostCommentVote
   * @example
   * // Get one PostCommentVote
   * const postCommentVote = await prisma.postCommentVote.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOnePostCommentVoteArgs>(
    args: Subset<T, FindOnePostCommentVoteArgs>
  ): CheckSelect<
    T,
    Prisma__PostCommentVoteClient<PostCommentVote | null>,
    Prisma__PostCommentVoteClient<PostCommentVoteGetPayload<T> | null>
  >;
  /**
   * Find the first PostCommentVote that matches the filter.
   * @param {FindFirstPostCommentVoteArgs} args - Arguments to find a PostCommentVote
   * @example
   * // Get one PostCommentVote
   * const postCommentVote = await prisma.postCommentVote.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findFirst<T extends FindFirstPostCommentVoteArgs>(
    args?: Subset<T, FindFirstPostCommentVoteArgs>
  ): CheckSelect<
    T,
    Prisma__PostCommentVoteClient<PostCommentVote | null>,
    Prisma__PostCommentVoteClient<PostCommentVoteGetPayload<T> | null>
  >;
  /**
   * Find zero or more PostCommentVotes that matches the filter.
   * @param {FindManyPostCommentVoteArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all PostCommentVotes
   * const postCommentVotes = await prisma.postCommentVote.findMany()
   *
   * // Get first 10 PostCommentVotes
   * const postCommentVotes = await prisma.postCommentVote.findMany({ take: 10 })
   *
   * // Only select the `commentId`
   * const postCommentVoteWithCommentIdOnly = await prisma.postCommentVote.findMany({ select: { commentId: true } })
   *
   **/
  findMany<T extends FindManyPostCommentVoteArgs>(
    args?: Subset<T, FindManyPostCommentVoteArgs>
  ): CheckSelect<
    T,
    Promise<Array<PostCommentVote>>,
    Promise<Array<PostCommentVoteGetPayload<T>>>
  >;
  /**
   * Create a PostCommentVote.
   * @param {PostCommentVoteCreateArgs} args - Arguments to create a PostCommentVote.
   * @example
   * // Create one PostCommentVote
   * const PostCommentVote = await prisma.postCommentVote.create({
   *   data: {
   *     // ... data to create a PostCommentVote
   *   }
   * })
   *
   **/
  create<T extends PostCommentVoteCreateArgs>(
    args: Subset<T, PostCommentVoteCreateArgs>
  ): CheckSelect<
    T,
    Prisma__PostCommentVoteClient<PostCommentVote>,
    Prisma__PostCommentVoteClient<PostCommentVoteGetPayload<T>>
  >;
  /**
   * Delete a PostCommentVote.
   * @param {PostCommentVoteDeleteArgs} args - Arguments to delete one PostCommentVote.
   * @example
   * // Delete one PostCommentVote
   * const PostCommentVote = await prisma.postCommentVote.delete({
   *   where: {
   *     // ... filter to delete one PostCommentVote
   *   }
   * })
   *
   **/
  delete<T extends PostCommentVoteDeleteArgs>(
    args: Subset<T, PostCommentVoteDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__PostCommentVoteClient<PostCommentVote>,
    Prisma__PostCommentVoteClient<PostCommentVoteGetPayload<T>>
  >;
  /**
   * Update one PostCommentVote.
   * @param {PostCommentVoteUpdateArgs} args - Arguments to update one PostCommentVote.
   * @example
   * // Update one PostCommentVote
   * const postCommentVote = await prisma.postCommentVote.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends PostCommentVoteUpdateArgs>(
    args: Subset<T, PostCommentVoteUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__PostCommentVoteClient<PostCommentVote>,
    Prisma__PostCommentVoteClient<PostCommentVoteGetPayload<T>>
  >;
  /**
   * Delete zero or more PostCommentVotes.
   * @param {PostCommentVoteDeleteManyArgs} args - Arguments to filter PostCommentVotes to delete.
   * @example
   * // Delete a few PostCommentVotes
   * const { count } = await prisma.postCommentVote.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends PostCommentVoteDeleteManyArgs>(
    args: Subset<T, PostCommentVoteDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more PostCommentVotes.
   * @param {PostCommentVoteUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many PostCommentVotes
   * const postCommentVote = await prisma.postCommentVote.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends PostCommentVoteUpdateManyArgs>(
    args: Subset<T, PostCommentVoteUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one PostCommentVote.
   * @param {PostCommentVoteUpsertArgs} args - Arguments to update or create a PostCommentVote.
   * @example
   * // Update or create a PostCommentVote
   * const postCommentVote = await prisma.postCommentVote.upsert({
   *   create: {
   *     // ... data to create a PostCommentVote
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the PostCommentVote we want to update
   *   }
   * })
   **/
  upsert<T extends PostCommentVoteUpsertArgs>(
    args: Subset<T, PostCommentVoteUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__PostCommentVoteClient<PostCommentVote>,
    Prisma__PostCommentVoteClient<PostCommentVoteGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyPostCommentVoteArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregatePostCommentVoteArgs>(
    args: Subset<T, AggregatePostCommentVoteArgs>
  ): Promise<GetPostCommentVoteAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for PostCommentVote.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__PostCommentVoteClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  comment<T extends PostCommentArgs = {}>(
    args?: Subset<T, PostCommentArgs>
  ): CheckSelect<
    T,
    Prisma__PostCommentClient<PostComment | null>,
    Prisma__PostCommentClient<PostCommentGetPayload<T> | null>
  >;

  user<T extends UserArgs = {}>(
    args?: Subset<T, UserArgs>
  ): CheckSelect<
    T,
    Prisma__UserClient<User | null>,
    Prisma__UserClient<UserGetPayload<T> | null>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * PostCommentVote findOne
 */
export type FindOnePostCommentVoteArgs = {
  /**
   * Select specific fields to fetch from the PostCommentVote
   **/
  select?: PostCommentVoteSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostCommentVoteInclude | null;
  /**
   * Filter, which PostCommentVote to fetch.
   **/
  where: PostCommentVoteWhereUniqueInput;
};

/**
 * PostCommentVote findFirst
 */
export type FindFirstPostCommentVoteArgs = {
  /**
   * Select specific fields to fetch from the PostCommentVote
   **/
  select?: PostCommentVoteSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostCommentVoteInclude | null;
  /**
   * Filter, which PostCommentVote to fetch.
   **/
  where?: PostCommentVoteWhereInput;
  orderBy?:
    | Enumerable<PostCommentVoteOrderByInput>
    | PostCommentVoteOrderByInput;
  cursor?: PostCommentVoteWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<PostCommentVoteDistinctFieldEnum>;
};

/**
 * PostCommentVote findMany
 */
export type FindManyPostCommentVoteArgs = {
  /**
   * Select specific fields to fetch from the PostCommentVote
   **/
  select?: PostCommentVoteSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostCommentVoteInclude | null;
  /**
   * Filter, which PostCommentVotes to fetch.
   **/
  where?: PostCommentVoteWhereInput;
  /**
   * Determine the order of the PostCommentVotes to fetch.
   **/
  orderBy?:
    | Enumerable<PostCommentVoteOrderByInput>
    | PostCommentVoteOrderByInput;
  /**
   * Sets the position for listing PostCommentVotes.
   **/
  cursor?: PostCommentVoteWhereUniqueInput;
  /**
   * The number of PostCommentVotes to fetch. If negative number, it will take PostCommentVotes before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` PostCommentVotes.
   **/
  skip?: number;
  distinct?: Enumerable<PostCommentVoteDistinctFieldEnum>;
};

/**
 * PostCommentVote create
 */
export type PostCommentVoteCreateArgs = {
  /**
   * Select specific fields to fetch from the PostCommentVote
   **/
  select?: PostCommentVoteSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostCommentVoteInclude | null;
  /**
   * The data needed to create a PostCommentVote.
   **/
  data: PostCommentVoteCreateInput;
};

/**
 * PostCommentVote update
 */
export type PostCommentVoteUpdateArgs = {
  /**
   * Select specific fields to fetch from the PostCommentVote
   **/
  select?: PostCommentVoteSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostCommentVoteInclude | null;
  /**
   * The data needed to update a PostCommentVote.
   **/
  data: PostCommentVoteUpdateInput;
  /**
   * Choose, which PostCommentVote to update.
   **/
  where: PostCommentVoteWhereUniqueInput;
};

/**
 * PostCommentVote updateMany
 */
export type PostCommentVoteUpdateManyArgs = {
  data: PostCommentVoteUpdateManyMutationInput;
  where?: PostCommentVoteWhereInput;
};

/**
 * PostCommentVote upsert
 */
export type PostCommentVoteUpsertArgs = {
  /**
   * Select specific fields to fetch from the PostCommentVote
   **/
  select?: PostCommentVoteSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostCommentVoteInclude | null;
  /**
   * The filter to search for the PostCommentVote to update in case it exists.
   **/
  where: PostCommentVoteWhereUniqueInput;
  /**
   * In case the PostCommentVote found by the `where` argument doesn't exist, create a new PostCommentVote with this data.
   **/
  create: PostCommentVoteCreateInput;
  /**
   * In case the PostCommentVote was found with the provided `where` argument, update it with this data.
   **/
  update: PostCommentVoteUpdateInput;
};

/**
 * PostCommentVote delete
 */
export type PostCommentVoteDeleteArgs = {
  /**
   * Select specific fields to fetch from the PostCommentVote
   **/
  select?: PostCommentVoteSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostCommentVoteInclude | null;
  /**
   * Filter which PostCommentVote to delete.
   **/
  where: PostCommentVoteWhereUniqueInput;
};

/**
 * PostCommentVote deleteMany
 */
export type PostCommentVoteDeleteManyArgs = {
  where?: PostCommentVoteWhereInput;
};

/**
 * PostCommentVote without action
 */
export type PostCommentVoteArgs = {
  /**
   * Select specific fields to fetch from the PostCommentVote
   **/
  select?: PostCommentVoteSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostCommentVoteInclude | null;
};

/**
 * Model PostVote
 */

export type PostVote = {
  postId: number;
  userId: number;
  createdDatetime: Date;
  voteType: number;
  updatedDatetime: Date;
};

export type AggregatePostVote = {
  count: number;
  avg: PostVoteAvgAggregateOutputType | null;
  sum: PostVoteSumAggregateOutputType | null;
  min: PostVoteMinAggregateOutputType | null;
  max: PostVoteMaxAggregateOutputType | null;
};

export type PostVoteAvgAggregateOutputType = {
  postId: number;
  userId: number;
  voteType: number;
};

export type PostVoteSumAggregateOutputType = {
  postId: number;
  userId: number;
  voteType: number;
};

export type PostVoteMinAggregateOutputType = {
  postId: number;
  userId: number;
  voteType: number;
};

export type PostVoteMaxAggregateOutputType = {
  postId: number;
  userId: number;
  voteType: number;
};

export type PostVoteAvgAggregateInputType = {
  postId?: true;
  userId?: true;
  voteType?: true;
};

export type PostVoteSumAggregateInputType = {
  postId?: true;
  userId?: true;
  voteType?: true;
};

export type PostVoteMinAggregateInputType = {
  postId?: true;
  userId?: true;
  voteType?: true;
};

export type PostVoteMaxAggregateInputType = {
  postId?: true;
  userId?: true;
  voteType?: true;
};

export type AggregatePostVoteArgs = {
  where?: PostVoteWhereInput;
  orderBy?: Enumerable<PostVoteOrderByInput> | PostVoteOrderByInput;
  cursor?: PostVoteWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<PostVoteDistinctFieldEnum>;
  count?: true;
  avg?: PostVoteAvgAggregateInputType;
  sum?: PostVoteSumAggregateInputType;
  min?: PostVoteMinAggregateInputType;
  max?: PostVoteMaxAggregateInputType;
};

export type GetPostVoteAggregateType<T extends AggregatePostVoteArgs> = {
  [P in keyof T]: P extends 'count'
    ? number
    : GetPostVoteAggregateScalarType<T[P]>;
};

export type GetPostVoteAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof PostVoteAvgAggregateOutputType
    ? PostVoteAvgAggregateOutputType[P]
    : never;
};

export type PostVoteSelect = {
  postId?: boolean;
  userId?: boolean;
  createdDatetime?: boolean;
  voteType?: boolean;
  updatedDatetime?: boolean;
  post?: boolean | PostArgs;
  user?: boolean | UserArgs;
};

export type PostVoteInclude = {
  post?: boolean | PostArgs;
  user?: boolean | UserArgs;
};

export type PostVoteGetPayload<
  S extends boolean | null | undefined | PostVoteArgs,
  U = keyof S
> = S extends true
  ? PostVote
  : S extends undefined
  ? never
  : S extends PostVoteArgs | FindManyPostVoteArgs
  ? 'include' extends U
    ? PostVote &
        {
          [P in TrueKeys<S['include']>]: P extends 'post'
            ? PostGetPayload<S['include'][P]>
            : P extends 'user'
            ? UserGetPayload<S['include'][P]>
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof PostVote
          ? PostVote[P]
          : P extends 'post'
          ? PostGetPayload<S['select'][P]>
          : P extends 'user'
          ? UserGetPayload<S['select'][P]>
          : never;
      }
    : PostVote
  : PostVote;

export interface PostVoteDelegate {
  /**
   * Find zero or one PostVote that matches the filter.
   * @param {FindOnePostVoteArgs} args - Arguments to find a PostVote
   * @example
   * // Get one PostVote
   * const postVote = await prisma.postVote.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOnePostVoteArgs>(
    args: Subset<T, FindOnePostVoteArgs>
  ): CheckSelect<
    T,
    Prisma__PostVoteClient<PostVote | null>,
    Prisma__PostVoteClient<PostVoteGetPayload<T> | null>
  >;
  /**
   * Find the first PostVote that matches the filter.
   * @param {FindFirstPostVoteArgs} args - Arguments to find a PostVote
   * @example
   * // Get one PostVote
   * const postVote = await prisma.postVote.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findFirst<T extends FindFirstPostVoteArgs>(
    args?: Subset<T, FindFirstPostVoteArgs>
  ): CheckSelect<
    T,
    Prisma__PostVoteClient<PostVote | null>,
    Prisma__PostVoteClient<PostVoteGetPayload<T> | null>
  >;
  /**
   * Find zero or more PostVotes that matches the filter.
   * @param {FindManyPostVoteArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all PostVotes
   * const postVotes = await prisma.postVote.findMany()
   *
   * // Get first 10 PostVotes
   * const postVotes = await prisma.postVote.findMany({ take: 10 })
   *
   * // Only select the `postId`
   * const postVoteWithPostIdOnly = await prisma.postVote.findMany({ select: { postId: true } })
   *
   **/
  findMany<T extends FindManyPostVoteArgs>(
    args?: Subset<T, FindManyPostVoteArgs>
  ): CheckSelect<
    T,
    Promise<Array<PostVote>>,
    Promise<Array<PostVoteGetPayload<T>>>
  >;
  /**
   * Create a PostVote.
   * @param {PostVoteCreateArgs} args - Arguments to create a PostVote.
   * @example
   * // Create one PostVote
   * const PostVote = await prisma.postVote.create({
   *   data: {
   *     // ... data to create a PostVote
   *   }
   * })
   *
   **/
  create<T extends PostVoteCreateArgs>(
    args: Subset<T, PostVoteCreateArgs>
  ): CheckSelect<
    T,
    Prisma__PostVoteClient<PostVote>,
    Prisma__PostVoteClient<PostVoteGetPayload<T>>
  >;
  /**
   * Delete a PostVote.
   * @param {PostVoteDeleteArgs} args - Arguments to delete one PostVote.
   * @example
   * // Delete one PostVote
   * const PostVote = await prisma.postVote.delete({
   *   where: {
   *     // ... filter to delete one PostVote
   *   }
   * })
   *
   **/
  delete<T extends PostVoteDeleteArgs>(
    args: Subset<T, PostVoteDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__PostVoteClient<PostVote>,
    Prisma__PostVoteClient<PostVoteGetPayload<T>>
  >;
  /**
   * Update one PostVote.
   * @param {PostVoteUpdateArgs} args - Arguments to update one PostVote.
   * @example
   * // Update one PostVote
   * const postVote = await prisma.postVote.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends PostVoteUpdateArgs>(
    args: Subset<T, PostVoteUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__PostVoteClient<PostVote>,
    Prisma__PostVoteClient<PostVoteGetPayload<T>>
  >;
  /**
   * Delete zero or more PostVotes.
   * @param {PostVoteDeleteManyArgs} args - Arguments to filter PostVotes to delete.
   * @example
   * // Delete a few PostVotes
   * const { count } = await prisma.postVote.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends PostVoteDeleteManyArgs>(
    args: Subset<T, PostVoteDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more PostVotes.
   * @param {PostVoteUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many PostVotes
   * const postVote = await prisma.postVote.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends PostVoteUpdateManyArgs>(
    args: Subset<T, PostVoteUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one PostVote.
   * @param {PostVoteUpsertArgs} args - Arguments to update or create a PostVote.
   * @example
   * // Update or create a PostVote
   * const postVote = await prisma.postVote.upsert({
   *   create: {
   *     // ... data to create a PostVote
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the PostVote we want to update
   *   }
   * })
   **/
  upsert<T extends PostVoteUpsertArgs>(
    args: Subset<T, PostVoteUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__PostVoteClient<PostVote>,
    Prisma__PostVoteClient<PostVoteGetPayload<T>>
  >;
  /**
   * Count
   */
  count(
    args?: Omit<FindManyPostVoteArgs, 'select' | 'include'>
  ): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregatePostVoteArgs>(
    args: Subset<T, AggregatePostVoteArgs>
  ): Promise<GetPostVoteAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for PostVote.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__PostVoteClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  post<T extends PostArgs = {}>(
    args?: Subset<T, PostArgs>
  ): CheckSelect<
    T,
    Prisma__PostClient<Post | null>,
    Prisma__PostClient<PostGetPayload<T> | null>
  >;

  user<T extends UserArgs = {}>(
    args?: Subset<T, UserArgs>
  ): CheckSelect<
    T,
    Prisma__UserClient<User | null>,
    Prisma__UserClient<UserGetPayload<T> | null>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * PostVote findOne
 */
export type FindOnePostVoteArgs = {
  /**
   * Select specific fields to fetch from the PostVote
   **/
  select?: PostVoteSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostVoteInclude | null;
  /**
   * Filter, which PostVote to fetch.
   **/
  where: PostVoteWhereUniqueInput;
};

/**
 * PostVote findFirst
 */
export type FindFirstPostVoteArgs = {
  /**
   * Select specific fields to fetch from the PostVote
   **/
  select?: PostVoteSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostVoteInclude | null;
  /**
   * Filter, which PostVote to fetch.
   **/
  where?: PostVoteWhereInput;
  orderBy?: Enumerable<PostVoteOrderByInput> | PostVoteOrderByInput;
  cursor?: PostVoteWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<PostVoteDistinctFieldEnum>;
};

/**
 * PostVote findMany
 */
export type FindManyPostVoteArgs = {
  /**
   * Select specific fields to fetch from the PostVote
   **/
  select?: PostVoteSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostVoteInclude | null;
  /**
   * Filter, which PostVotes to fetch.
   **/
  where?: PostVoteWhereInput;
  /**
   * Determine the order of the PostVotes to fetch.
   **/
  orderBy?: Enumerable<PostVoteOrderByInput> | PostVoteOrderByInput;
  /**
   * Sets the position for listing PostVotes.
   **/
  cursor?: PostVoteWhereUniqueInput;
  /**
   * The number of PostVotes to fetch. If negative number, it will take PostVotes before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` PostVotes.
   **/
  skip?: number;
  distinct?: Enumerable<PostVoteDistinctFieldEnum>;
};

/**
 * PostVote create
 */
export type PostVoteCreateArgs = {
  /**
   * Select specific fields to fetch from the PostVote
   **/
  select?: PostVoteSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostVoteInclude | null;
  /**
   * The data needed to create a PostVote.
   **/
  data: PostVoteCreateInput;
};

/**
 * PostVote update
 */
export type PostVoteUpdateArgs = {
  /**
   * Select specific fields to fetch from the PostVote
   **/
  select?: PostVoteSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostVoteInclude | null;
  /**
   * The data needed to update a PostVote.
   **/
  data: PostVoteUpdateInput;
  /**
   * Choose, which PostVote to update.
   **/
  where: PostVoteWhereUniqueInput;
};

/**
 * PostVote updateMany
 */
export type PostVoteUpdateManyArgs = {
  data: PostVoteUpdateManyMutationInput;
  where?: PostVoteWhereInput;
};

/**
 * PostVote upsert
 */
export type PostVoteUpsertArgs = {
  /**
   * Select specific fields to fetch from the PostVote
   **/
  select?: PostVoteSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostVoteInclude | null;
  /**
   * The filter to search for the PostVote to update in case it exists.
   **/
  where: PostVoteWhereUniqueInput;
  /**
   * In case the PostVote found by the `where` argument doesn't exist, create a new PostVote with this data.
   **/
  create: PostVoteCreateInput;
  /**
   * In case the PostVote was found with the provided `where` argument, update it with this data.
   **/
  update: PostVoteUpdateInput;
};

/**
 * PostVote delete
 */
export type PostVoteDeleteArgs = {
  /**
   * Select specific fields to fetch from the PostVote
   **/
  select?: PostVoteSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostVoteInclude | null;
  /**
   * Filter which PostVote to delete.
   **/
  where: PostVoteWhereUniqueInput;
};

/**
 * PostVote deleteMany
 */
export type PostVoteDeleteManyArgs = {
  where?: PostVoteWhereInput;
};

/**
 * PostVote without action
 */
export type PostVoteArgs = {
  /**
   * Select specific fields to fetch from the PostVote
   **/
  select?: PostVoteSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: PostVoteInclude | null;
};

/**
 * Model User
 */

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  karma: number;
  role: UserRole;
  emailVerified: boolean;
};

export type AggregateUser = {
  count: number;
  avg: UserAvgAggregateOutputType | null;
  sum: UserSumAggregateOutputType | null;
  min: UserMinAggregateOutputType | null;
  max: UserMaxAggregateOutputType | null;
};

export type UserAvgAggregateOutputType = {
  id: number;
  karma: number;
};

export type UserSumAggregateOutputType = {
  id: number;
  karma: number;
};

export type UserMinAggregateOutputType = {
  id: number;
  karma: number;
};

export type UserMaxAggregateOutputType = {
  id: number;
  karma: number;
};

export type UserAvgAggregateInputType = {
  id?: true;
  karma?: true;
};

export type UserSumAggregateInputType = {
  id?: true;
  karma?: true;
};

export type UserMinAggregateInputType = {
  id?: true;
  karma?: true;
};

export type UserMaxAggregateInputType = {
  id?: true;
  karma?: true;
};

export type AggregateUserArgs = {
  where?: UserWhereInput;
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput;
  cursor?: UserWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<UserDistinctFieldEnum>;
  count?: true;
  avg?: UserAvgAggregateInputType;
  sum?: UserSumAggregateInputType;
  min?: UserMinAggregateInputType;
  max?: UserMaxAggregateInputType;
};

export type GetUserAggregateType<T extends AggregateUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserAggregateScalarType<T[P]>;
};

export type GetUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserAvgAggregateOutputType
    ? UserAvgAggregateOutputType[P]
    : never;
};

export type UserSelect = {
  id?: boolean;
  username?: boolean;
  email?: boolean;
  password?: boolean;
  karma?: boolean;
  role?: boolean;
  emailVerified?: boolean;
  groupUsers?: boolean | FindManyGroupUserArgs;
  posts?: boolean | FindManyPostArgs;
  comments?: boolean | FindManyPostCommentArgs;
  commentVotes?: boolean | FindManyPostCommentVoteArgs;
  postVotes?: boolean | FindManyPostVoteArgs;
};

export type UserInclude = {
  groupUsers?: boolean | FindManyGroupUserArgs;
  posts?: boolean | FindManyPostArgs;
  comments?: boolean | FindManyPostCommentArgs;
  commentVotes?: boolean | FindManyPostCommentVoteArgs;
  postVotes?: boolean | FindManyPostVoteArgs;
};

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User &
        {
          [P in TrueKeys<S['include']>]: P extends 'groupUsers'
            ? Array<GroupUserGetPayload<S['include'][P]>>
            : P extends 'posts'
            ? Array<PostGetPayload<S['include'][P]>>
            : P extends 'comments'
            ? Array<PostCommentGetPayload<S['include'][P]>>
            : P extends 'commentVotes'
            ? Array<PostCommentVoteGetPayload<S['include'][P]>>
            : P extends 'postVotes'
            ? Array<PostVoteGetPayload<S['include'][P]>>
            : never;
        }
    : 'select' extends U
    ? {
        [P in TrueKeys<S['select']>]: P extends keyof User
          ? User[P]
          : P extends 'groupUsers'
          ? Array<GroupUserGetPayload<S['select'][P]>>
          : P extends 'posts'
          ? Array<PostGetPayload<S['select'][P]>>
          : P extends 'comments'
          ? Array<PostCommentGetPayload<S['select'][P]>>
          : P extends 'commentVotes'
          ? Array<PostCommentVoteGetPayload<S['select'][P]>>
          : P extends 'postVotes'
          ? Array<PostVoteGetPayload<S['select'][P]>>
          : never;
      }
    : User
  : User;

export interface UserDelegate {
  /**
   * Find zero or one User that matches the filter.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<
    T,
    Prisma__UserClient<User | null>,
    Prisma__UserClient<UserGetPayload<T> | null>
  >;
  /**
   * Find the first User that matches the filter.
   * @param {FindFirstUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   **/
  findFirst<T extends FindFirstUserArgs>(
    args?: Subset<T, FindFirstUserArgs>
  ): CheckSelect<
    T,
    Prisma__UserClient<User | null>,
    Prisma__UserClient<UserGetPayload<T> | null>
  >;
  /**
   * Find zero or more Users that matches the filter.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   *
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ take: 10 })
   *
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   *
   **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>;
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   *
   **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<
    T,
    Prisma__UserClient<User>,
    Prisma__UserClient<UserGetPayload<T>>
  >;
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const User = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   *
   **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<
    T,
    Prisma__UserClient<User>,
    Prisma__UserClient<UserGetPayload<T>>
  >;
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<
    T,
    Prisma__UserClient<User>,
    Prisma__UserClient<UserGetPayload<T>>
  >;
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   *
   **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   *
   **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>;
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
   **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<
    T,
    Prisma__UserClient<User>,
    Prisma__UserClient<UserGetPayload<T>>
  >;
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>;

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserArgs>(
    args: Subset<T, AggregateUserArgs>
  ): Promise<GetUserAggregateType<T>>;
}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(
    _dmmf: DMMFClass,
    _fetcher: PrismaClientFetcher,
    _queryType: 'query' | 'mutation',
    _rootField: string,
    _clientMethod: string,
    _args: any,
    _dataPath: string[],
    _errorFormat: ErrorFormat,
    _measurePerformance?: boolean | undefined,
    _isList?: boolean
  );
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  groupUsers<T extends FindManyGroupUserArgs = {}>(
    args?: Subset<T, FindManyGroupUserArgs>
  ): CheckSelect<
    T,
    Promise<Array<GroupUser>>,
    Promise<Array<GroupUserGetPayload<T>>>
  >;

  posts<T extends FindManyPostArgs = {}>(
    args?: Subset<T, FindManyPostArgs>
  ): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>;

  comments<T extends FindManyPostCommentArgs = {}>(
    args?: Subset<T, FindManyPostCommentArgs>
  ): CheckSelect<
    T,
    Promise<Array<PostComment>>,
    Promise<Array<PostCommentGetPayload<T>>>
  >;

  commentVotes<T extends FindManyPostCommentVoteArgs = {}>(
    args?: Subset<T, FindManyPostCommentVoteArgs>
  ): CheckSelect<
    T,
    Promise<Array<PostCommentVote>>,
    Promise<Array<PostCommentVoteGetPayload<T>>>
  >;

  postVotes<T extends FindManyPostVoteArgs = {}>(
    args?: Subset<T, FindManyPostVoteArgs>
  ): CheckSelect<
    T,
    Promise<Array<PostVote>>,
    Promise<Array<PostVoteGetPayload<T>>>
  >;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | Promise<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | Promise<TResult2>)
      | undefined
      | null
  ): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | Promise<TResult>)
      | undefined
      | null
  ): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
   **/
  select?: UserSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: UserInclude | null;
  /**
   * Filter, which User to fetch.
   **/
  where: UserWhereUniqueInput;
};

/**
 * User findFirst
 */
export type FindFirstUserArgs = {
  /**
   * Select specific fields to fetch from the User
   **/
  select?: UserSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: UserInclude | null;
  /**
   * Filter, which User to fetch.
   **/
  where?: UserWhereInput;
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput;
  cursor?: UserWhereUniqueInput;
  take?: number;
  skip?: number;
  distinct?: Enumerable<UserDistinctFieldEnum>;
};

/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
   **/
  select?: UserSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: UserInclude | null;
  /**
   * Filter, which Users to fetch.
   **/
  where?: UserWhereInput;
  /**
   * Determine the order of the Users to fetch.
   **/
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput;
  /**
   * Sets the position for listing Users.
   **/
  cursor?: UserWhereUniqueInput;
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
   **/
  take?: number;
  /**
   * Skip the first `n` Users.
   **/
  skip?: number;
  distinct?: Enumerable<UserDistinctFieldEnum>;
};

/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
   **/
  select?: UserSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: UserInclude | null;
  /**
   * The data needed to create a User.
   **/
  data: UserCreateInput;
};

/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
   **/
  select?: UserSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: UserInclude | null;
  /**
   * The data needed to update a User.
   **/
  data: UserUpdateInput;
  /**
   * Choose, which User to update.
   **/
  where: UserWhereUniqueInput;
};

/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput;
  where?: UserWhereInput;
};

/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
   **/
  select?: UserSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: UserInclude | null;
  /**
   * The filter to search for the User to update in case it exists.
   **/
  where: UserWhereUniqueInput;
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
   **/
  create: UserCreateInput;
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
   **/
  update: UserUpdateInput;
};

/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
   **/
  select?: UserSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: UserInclude | null;
  /**
   * Filter which User to delete.
   **/
  where: UserWhereUniqueInput;
};

/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput;
};

/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
   **/
  select?: UserSelect | null;
  /**
   * Choose, which related nodes to fetch as well.
   **/
  include?: UserInclude | null;
};

/**
 * Deep Input Types
 */

export type GroupWhereInput = {
  AND?: GroupWhereInput | Enumerable<GroupWhereInput>;
  OR?: GroupWhereInput | Enumerable<GroupWhereInput>;
  NOT?: GroupWhereInput | Enumerable<GroupWhereInput>;
  id?: IntFilter | number;
  name?: StringFilter | string;
  description?: StringFilter | string;
  title?: StringNullableFilter | string | null;
  users?: GroupUserListRelationFilter;
  posts?: PostListRelationFilter;
};

export type GroupOrderByInput = {
  id?: SortOrder;
  name?: SortOrder;
  description?: SortOrder;
  title?: SortOrder;
};

export type GroupWhereUniqueInput = {
  id?: number;
  name?: string;
};

export type GroupUserWhereInput = {
  AND?: GroupUserWhereInput | Enumerable<GroupUserWhereInput>;
  OR?: GroupUserWhereInput | Enumerable<GroupUserWhereInput>;
  NOT?: GroupUserWhereInput | Enumerable<GroupUserWhereInput>;
  groupId?: IntFilter | number;
  userId?: IntFilter | number;
  role?: EnumGroupUserRoleNullableFilter | GroupUserRole | null;
  group?: GroupRelationFilter | GroupWhereInput;
  user?: UserRelationFilter | UserWhereInput;
};

export type GroupUserOrderByInput = {
  groupId?: SortOrder;
  userId?: SortOrder;
  role?: SortOrder;
};

export type GroupUserWhereUniqueInput = {
  groupId_userId?: GroupIdUserIdCompoundUniqueInput;
};

export type PostWhereInput = {
  AND?: PostWhereInput | Enumerable<PostWhereInput>;
  OR?: PostWhereInput | Enumerable<PostWhereInput>;
  NOT?: PostWhereInput | Enumerable<PostWhereInput>;
  id?: IntFilter | number;
  groupId?: IntFilter | number;
  userId?: IntFilter | number;
  title?: StringFilter | string;
  content?: StringFilter | string;
  media?: StringNullableFilter | string | null;
  createdDate?: DateTimeFilter | Date | string;
  updatedDate?: DateTimeFilter | Date | string;
  group?: GroupRelationFilter | GroupWhereInput;
  user?: UserRelationFilter | UserWhereInput;
  comments?: PostCommentListRelationFilter;
  votes?: PostVoteListRelationFilter;
};

export type PostOrderByInput = {
  id?: SortOrder;
  groupId?: SortOrder;
  userId?: SortOrder;
  title?: SortOrder;
  content?: SortOrder;
  media?: SortOrder;
  createdDate?: SortOrder;
  updatedDate?: SortOrder;
};

export type PostWhereUniqueInput = {
  id?: number;
  title?: string;
};

export type PostCommentWhereInput = {
  AND?: PostCommentWhereInput | Enumerable<PostCommentWhereInput>;
  OR?: PostCommentWhereInput | Enumerable<PostCommentWhereInput>;
  NOT?: PostCommentWhereInput | Enumerable<PostCommentWhereInput>;
  id?: IntFilter | number;
  postId?: IntFilter | number;
  userId?: IntFilter | number;
  parentCommentId?: IntFilter | number;
  content?: StringFilter | string;
  parentComment?: PostCommentRelationFilter | PostCommentWhereInput;
  post?: PostRelationFilter | PostWhereInput;
  user?: UserRelationFilter | UserWhereInput;
  childComments?: PostCommentListRelationFilter;
  votes?: PostCommentVoteListRelationFilter;
};

export type PostCommentOrderByInput = {
  id?: SortOrder;
  postId?: SortOrder;
  userId?: SortOrder;
  parentCommentId?: SortOrder;
  content?: SortOrder;
};

export type PostCommentWhereUniqueInput = {
  id?: number;
};

export type PostCommentVoteWhereInput = {
  AND?: PostCommentVoteWhereInput | Enumerable<PostCommentVoteWhereInput>;
  OR?: PostCommentVoteWhereInput | Enumerable<PostCommentVoteWhereInput>;
  NOT?: PostCommentVoteWhereInput | Enumerable<PostCommentVoteWhereInput>;
  commentId?: IntFilter | number;
  userId?: IntFilter | number;
  createdDatetime?: DateTimeFilter | Date | string;
  voteType?: IntFilter | number;
  updatedDatetime?: DateTimeFilter | Date | string;
  comment?: PostCommentRelationFilter | PostCommentWhereInput;
  user?: UserRelationFilter | UserWhereInput;
};

export type PostCommentVoteOrderByInput = {
  commentId?: SortOrder;
  userId?: SortOrder;
  createdDatetime?: SortOrder;
  voteType?: SortOrder;
  updatedDatetime?: SortOrder;
};

export type PostCommentVoteWhereUniqueInput = {
  commentId_userId?: CommentIdUserIdCompoundUniqueInput;
};

export type PostVoteWhereInput = {
  AND?: PostVoteWhereInput | Enumerable<PostVoteWhereInput>;
  OR?: PostVoteWhereInput | Enumerable<PostVoteWhereInput>;
  NOT?: PostVoteWhereInput | Enumerable<PostVoteWhereInput>;
  postId?: IntFilter | number;
  userId?: IntFilter | number;
  createdDatetime?: DateTimeFilter | Date | string;
  voteType?: IntFilter | number;
  updatedDatetime?: DateTimeFilter | Date | string;
  post?: PostRelationFilter | PostWhereInput;
  user?: UserRelationFilter | UserWhereInput;
};

export type PostVoteOrderByInput = {
  postId?: SortOrder;
  userId?: SortOrder;
  createdDatetime?: SortOrder;
  voteType?: SortOrder;
  updatedDatetime?: SortOrder;
};

export type PostVoteWhereUniqueInput = {
  postId_userId?: PostIdUserIdCompoundUniqueInput;
};

export type UserWhereInput = {
  AND?: UserWhereInput | Enumerable<UserWhereInput>;
  OR?: UserWhereInput | Enumerable<UserWhereInput>;
  NOT?: UserWhereInput | Enumerable<UserWhereInput>;
  id?: IntFilter | number;
  username?: StringFilter | string;
  email?: StringFilter | string;
  password?: StringFilter | string;
  karma?: IntFilter | number;
  role?: EnumUserRoleFilter | UserRole;
  emailVerified?: BoolFilter | boolean;
  groupUsers?: GroupUserListRelationFilter;
  posts?: PostListRelationFilter;
  comments?: PostCommentListRelationFilter;
  commentVotes?: PostCommentVoteListRelationFilter;
  postVotes?: PostVoteListRelationFilter;
};

export type UserOrderByInput = {
  id?: SortOrder;
  username?: SortOrder;
  email?: SortOrder;
  password?: SortOrder;
  karma?: SortOrder;
  role?: SortOrder;
  emailVerified?: SortOrder;
};

export type UserWhereUniqueInput = {
  id?: number;
  username?: string;
  email?: string;
};

export type GroupCreateInput = {
  name: string;
  description: string;
  title?: string | null;
  users?: GroupUserCreateManyWithoutGroupInput;
  posts?: PostCreateManyWithoutGroupInput;
};

export type GroupUpdateInput = {
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | StringFieldUpdateOperationsInput;
  title?: string | NullableStringFieldUpdateOperationsInput | null;
  users?: GroupUserUpdateManyWithoutGroupInput;
  posts?: PostUpdateManyWithoutGroupInput;
};

export type GroupUpdateManyMutationInput = {
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | StringFieldUpdateOperationsInput;
  title?: string | NullableStringFieldUpdateOperationsInput | null;
};

export type GroupUserCreateInput = {
  role?: GroupUserRole | null;
  group: GroupCreateOneWithoutUsersInput;
  user: UserCreateOneWithoutGroupUsersInput;
};

export type GroupUserUpdateInput = {
  role?:
    | GroupUserRole
    | NullableEnumGroupUserRoleFieldUpdateOperationsInput
    | null;
  group?: GroupUpdateOneRequiredWithoutUsersInput;
  user?: UserUpdateOneRequiredWithoutGroupUsersInput;
};

export type GroupUserUpdateManyMutationInput = {
  role?:
    | GroupUserRole
    | NullableEnumGroupUserRoleFieldUpdateOperationsInput
    | null;
};

export type PostCreateInput = {
  title: string;
  content: string;
  media?: string | null;
  createdDate?: Date | string;
  updatedDate?: Date | string;
  group: GroupCreateOneWithoutPostsInput;
  user: UserCreateOneWithoutPostsInput;
  comments?: PostCommentCreateManyWithoutPostInput;
  votes?: PostVoteCreateManyWithoutPostInput;
};

export type PostUpdateInput = {
  title?: string | StringFieldUpdateOperationsInput;
  content?: string | StringFieldUpdateOperationsInput;
  media?: string | NullableStringFieldUpdateOperationsInput | null;
  createdDate?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedDate?: Date | string | DateTimeFieldUpdateOperationsInput;
  group?: GroupUpdateOneRequiredWithoutPostsInput;
  user?: UserUpdateOneRequiredWithoutPostsInput;
  comments?: PostCommentUpdateManyWithoutPostInput;
  votes?: PostVoteUpdateManyWithoutPostInput;
};

export type PostUpdateManyMutationInput = {
  title?: string | StringFieldUpdateOperationsInput;
  content?: string | StringFieldUpdateOperationsInput;
  media?: string | NullableStringFieldUpdateOperationsInput | null;
  createdDate?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedDate?: Date | string | DateTimeFieldUpdateOperationsInput;
};

export type PostCommentCreateInput = {
  content: string;
  parentComment: PostCommentCreateOneWithoutChildCommentsInput;
  post: PostCreateOneWithoutCommentsInput;
  user: UserCreateOneWithoutCommentsInput;
  childComments?: PostCommentCreateManyWithoutParentCommentInput;
  votes?: PostCommentVoteCreateManyWithoutCommentInput;
};

export type PostCommentUpdateInput = {
  content?: string | StringFieldUpdateOperationsInput;
  parentComment?: PostCommentUpdateOneRequiredWithoutChildCommentsInput;
  post?: PostUpdateOneRequiredWithoutCommentsInput;
  user?: UserUpdateOneRequiredWithoutCommentsInput;
  childComments?: PostCommentUpdateManyWithoutParentCommentInput;
  votes?: PostCommentVoteUpdateManyWithoutCommentInput;
};

export type PostCommentUpdateManyMutationInput = {
  content?: string | StringFieldUpdateOperationsInput;
};

export type PostCommentVoteCreateInput = {
  createdDatetime?: Date | string;
  voteType: number;
  updatedDatetime: Date | string;
  comment: PostCommentCreateOneWithoutVotesInput;
  user: UserCreateOneWithoutCommentVotesInput;
};

export type PostCommentVoteUpdateInput = {
  createdDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
  voteType?: number | IntFieldUpdateOperationsInput;
  updatedDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
  comment?: PostCommentUpdateOneRequiredWithoutVotesInput;
  user?: UserUpdateOneRequiredWithoutCommentVotesInput;
};

export type PostCommentVoteUpdateManyMutationInput = {
  createdDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
  voteType?: number | IntFieldUpdateOperationsInput;
  updatedDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
};

export type PostVoteCreateInput = {
  createdDatetime?: Date | string;
  voteType: number;
  updatedDatetime: Date | string;
  post: PostCreateOneWithoutVotesInput;
  user: UserCreateOneWithoutPostVotesInput;
};

export type PostVoteUpdateInput = {
  createdDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
  voteType?: number | IntFieldUpdateOperationsInput;
  updatedDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
  post?: PostUpdateOneRequiredWithoutVotesInput;
  user?: UserUpdateOneRequiredWithoutPostVotesInput;
};

export type PostVoteUpdateManyMutationInput = {
  createdDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
  voteType?: number | IntFieldUpdateOperationsInput;
  updatedDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
};

export type UserCreateInput = {
  username: string;
  email: string;
  password: string;
  karma: number;
  role: UserRole;
  emailVerified?: boolean;
  groupUsers?: GroupUserCreateManyWithoutUserInput;
  posts?: PostCreateManyWithoutUserInput;
  comments?: PostCommentCreateManyWithoutUserInput;
  commentVotes?: PostCommentVoteCreateManyWithoutUserInput;
  postVotes?: PostVoteCreateManyWithoutUserInput;
};

export type UserUpdateInput = {
  username?: string | StringFieldUpdateOperationsInput;
  email?: string | StringFieldUpdateOperationsInput;
  password?: string | StringFieldUpdateOperationsInput;
  karma?: number | IntFieldUpdateOperationsInput;
  role?: UserRole | EnumUserRoleFieldUpdateOperationsInput;
  emailVerified?: boolean | BoolFieldUpdateOperationsInput;
  groupUsers?: GroupUserUpdateManyWithoutUserInput;
  posts?: PostUpdateManyWithoutUserInput;
  comments?: PostCommentUpdateManyWithoutUserInput;
  commentVotes?: PostCommentVoteUpdateManyWithoutUserInput;
  postVotes?: PostVoteUpdateManyWithoutUserInput;
};

export type UserUpdateManyMutationInput = {
  username?: string | StringFieldUpdateOperationsInput;
  email?: string | StringFieldUpdateOperationsInput;
  password?: string | StringFieldUpdateOperationsInput;
  karma?: number | IntFieldUpdateOperationsInput;
  role?: UserRole | EnumUserRoleFieldUpdateOperationsInput;
  emailVerified?: boolean | BoolFieldUpdateOperationsInput;
};

export type IntFilter = {
  equals?: number;
  in?: Enumerable<number>;
  notIn?: Enumerable<number>;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: number | NestedIntFilter;
};

export type StringFilter = {
  equals?: string;
  in?: Enumerable<string>;
  notIn?: Enumerable<string>;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  mode?: QueryMode;
  not?: string | NestedStringFilter;
};

export type StringNullableFilter = {
  equals?: string | null;
  in?: Enumerable<string> | null;
  notIn?: Enumerable<string> | null;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  mode?: QueryMode;
  not?: string | NestedStringNullableFilter | null;
};

export type GroupUserListRelationFilter = {
  every?: GroupUserWhereInput;
  some?: GroupUserWhereInput;
  none?: GroupUserWhereInput;
};

export type PostListRelationFilter = {
  every?: PostWhereInput;
  some?: PostWhereInput;
  none?: PostWhereInput;
};

export type EnumGroupUserRoleNullableFilter = {
  equals?: GroupUserRole | null;
  in?: Enumerable<GroupUserRole> | null;
  notIn?: Enumerable<GroupUserRole> | null;
  not?: GroupUserRole | NestedEnumGroupUserRoleNullableFilter | null;
};

export type GroupRelationFilter = {
  is?: GroupWhereInput;
  isNot?: GroupWhereInput;
};

export type UserRelationFilter = {
  is?: UserWhereInput;
  isNot?: UserWhereInput;
};

export type GroupIdUserIdCompoundUniqueInput = {
  groupId: number;
  userId: number;
};

export type DateTimeFilter = {
  equals?: Date | string;
  in?: Enumerable<Date> | Enumerable<string>;
  notIn?: Enumerable<Date> | Enumerable<string>;
  lt?: Date | string;
  lte?: Date | string;
  gt?: Date | string;
  gte?: Date | string;
  not?: Date | string | NestedDateTimeFilter;
};

export type PostCommentListRelationFilter = {
  every?: PostCommentWhereInput;
  some?: PostCommentWhereInput;
  none?: PostCommentWhereInput;
};

export type PostVoteListRelationFilter = {
  every?: PostVoteWhereInput;
  some?: PostVoteWhereInput;
  none?: PostVoteWhereInput;
};

export type PostCommentRelationFilter = {
  is?: PostCommentWhereInput;
  isNot?: PostCommentWhereInput;
};

export type PostRelationFilter = {
  is?: PostWhereInput;
  isNot?: PostWhereInput;
};

export type PostCommentVoteListRelationFilter = {
  every?: PostCommentVoteWhereInput;
  some?: PostCommentVoteWhereInput;
  none?: PostCommentVoteWhereInput;
};

export type CommentIdUserIdCompoundUniqueInput = {
  commentId: number;
  userId: number;
};

export type PostIdUserIdCompoundUniqueInput = {
  postId: number;
  userId: number;
};

export type EnumUserRoleFilter = {
  equals?: UserRole;
  in?: Enumerable<UserRole>;
  notIn?: Enumerable<UserRole>;
  not?: UserRole | NestedEnumUserRoleFilter;
};

export type BoolFilter = {
  equals?: boolean;
  not?: boolean | NestedBoolFilter;
};

export type GroupUserCreateManyWithoutGroupInput = {
  create?:
    | GroupUserCreateWithoutGroupInput
    | Enumerable<GroupUserCreateWithoutGroupInput>;
  connect?: GroupUserWhereUniqueInput | Enumerable<GroupUserWhereUniqueInput>;
};

export type PostCreateManyWithoutGroupInput = {
  create?:
    | PostCreateWithoutGroupInput
    | Enumerable<PostCreateWithoutGroupInput>;
  connect?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>;
};

export type StringFieldUpdateOperationsInput = {
  set?: string;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null;
};

export type GroupUserUpdateManyWithoutGroupInput = {
  create?:
    | GroupUserCreateWithoutGroupInput
    | Enumerable<GroupUserCreateWithoutGroupInput>;
  connect?: GroupUserWhereUniqueInput | Enumerable<GroupUserWhereUniqueInput>;
  set?: GroupUserWhereUniqueInput | Enumerable<GroupUserWhereUniqueInput>;
  disconnect?:
    | GroupUserWhereUniqueInput
    | Enumerable<GroupUserWhereUniqueInput>;
  delete?: GroupUserWhereUniqueInput | Enumerable<GroupUserWhereUniqueInput>;
  update?:
    | GroupUserUpdateWithWhereUniqueWithoutGroupInput
    | Enumerable<GroupUserUpdateWithWhereUniqueWithoutGroupInput>;
  updateMany?:
    | GroupUserUpdateManyWithWhereNestedInput
    | Enumerable<GroupUserUpdateManyWithWhereNestedInput>;
  deleteMany?:
    | GroupUserScalarWhereInput
    | Enumerable<GroupUserScalarWhereInput>;
  upsert?:
    | GroupUserUpsertWithWhereUniqueWithoutGroupInput
    | Enumerable<GroupUserUpsertWithWhereUniqueWithoutGroupInput>;
};

export type PostUpdateManyWithoutGroupInput = {
  create?:
    | PostCreateWithoutGroupInput
    | Enumerable<PostCreateWithoutGroupInput>;
  connect?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>;
  set?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>;
  disconnect?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>;
  delete?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>;
  update?:
    | PostUpdateWithWhereUniqueWithoutGroupInput
    | Enumerable<PostUpdateWithWhereUniqueWithoutGroupInput>;
  updateMany?:
    | PostUpdateManyWithWhereNestedInput
    | Enumerable<PostUpdateManyWithWhereNestedInput>;
  deleteMany?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>;
  upsert?:
    | PostUpsertWithWhereUniqueWithoutGroupInput
    | Enumerable<PostUpsertWithWhereUniqueWithoutGroupInput>;
};

export type GroupCreateOneWithoutUsersInput = {
  create?: GroupCreateWithoutUsersInput;
  connect?: GroupWhereUniqueInput;
};

export type UserCreateOneWithoutGroupUsersInput = {
  create?: UserCreateWithoutGroupUsersInput;
  connect?: UserWhereUniqueInput;
};

export type NullableEnumGroupUserRoleFieldUpdateOperationsInput = {
  set?: GroupUserRole | null;
};

export type GroupUpdateOneRequiredWithoutUsersInput = {
  create?: GroupCreateWithoutUsersInput;
  connect?: GroupWhereUniqueInput;
  update?: GroupUpdateWithoutUsersDataInput;
  upsert?: GroupUpsertWithoutUsersInput;
};

export type UserUpdateOneRequiredWithoutGroupUsersInput = {
  create?: UserCreateWithoutGroupUsersInput;
  connect?: UserWhereUniqueInput;
  update?: UserUpdateWithoutGroupUsersDataInput;
  upsert?: UserUpsertWithoutGroupUsersInput;
};

export type GroupCreateOneWithoutPostsInput = {
  create?: GroupCreateWithoutPostsInput;
  connect?: GroupWhereUniqueInput;
};

export type UserCreateOneWithoutPostsInput = {
  create?: UserCreateWithoutPostsInput;
  connect?: UserWhereUniqueInput;
};

export type PostCommentCreateManyWithoutPostInput = {
  create?:
    | PostCommentCreateWithoutPostInput
    | Enumerable<PostCommentCreateWithoutPostInput>;
  connect?:
    | PostCommentWhereUniqueInput
    | Enumerable<PostCommentWhereUniqueInput>;
};

export type PostVoteCreateManyWithoutPostInput = {
  create?:
    | PostVoteCreateWithoutPostInput
    | Enumerable<PostVoteCreateWithoutPostInput>;
  connect?: PostVoteWhereUniqueInput | Enumerable<PostVoteWhereUniqueInput>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string;
};

export type GroupUpdateOneRequiredWithoutPostsInput = {
  create?: GroupCreateWithoutPostsInput;
  connect?: GroupWhereUniqueInput;
  update?: GroupUpdateWithoutPostsDataInput;
  upsert?: GroupUpsertWithoutPostsInput;
};

export type UserUpdateOneRequiredWithoutPostsInput = {
  create?: UserCreateWithoutPostsInput;
  connect?: UserWhereUniqueInput;
  update?: UserUpdateWithoutPostsDataInput;
  upsert?: UserUpsertWithoutPostsInput;
};

export type PostCommentUpdateManyWithoutPostInput = {
  create?:
    | PostCommentCreateWithoutPostInput
    | Enumerable<PostCommentCreateWithoutPostInput>;
  connect?:
    | PostCommentWhereUniqueInput
    | Enumerable<PostCommentWhereUniqueInput>;
  set?: PostCommentWhereUniqueInput | Enumerable<PostCommentWhereUniqueInput>;
  disconnect?:
    | PostCommentWhereUniqueInput
    | Enumerable<PostCommentWhereUniqueInput>;
  delete?:
    | PostCommentWhereUniqueInput
    | Enumerable<PostCommentWhereUniqueInput>;
  update?:
    | PostCommentUpdateWithWhereUniqueWithoutPostInput
    | Enumerable<PostCommentUpdateWithWhereUniqueWithoutPostInput>;
  updateMany?:
    | PostCommentUpdateManyWithWhereNestedInput
    | Enumerable<PostCommentUpdateManyWithWhereNestedInput>;
  deleteMany?:
    | PostCommentScalarWhereInput
    | Enumerable<PostCommentScalarWhereInput>;
  upsert?:
    | PostCommentUpsertWithWhereUniqueWithoutPostInput
    | Enumerable<PostCommentUpsertWithWhereUniqueWithoutPostInput>;
};

export type PostVoteUpdateManyWithoutPostInput = {
  create?:
    | PostVoteCreateWithoutPostInput
    | Enumerable<PostVoteCreateWithoutPostInput>;
  connect?: PostVoteWhereUniqueInput | Enumerable<PostVoteWhereUniqueInput>;
  set?: PostVoteWhereUniqueInput | Enumerable<PostVoteWhereUniqueInput>;
  disconnect?: PostVoteWhereUniqueInput | Enumerable<PostVoteWhereUniqueInput>;
  delete?: PostVoteWhereUniqueInput | Enumerable<PostVoteWhereUniqueInput>;
  update?:
    | PostVoteUpdateWithWhereUniqueWithoutPostInput
    | Enumerable<PostVoteUpdateWithWhereUniqueWithoutPostInput>;
  updateMany?:
    | PostVoteUpdateManyWithWhereNestedInput
    | Enumerable<PostVoteUpdateManyWithWhereNestedInput>;
  deleteMany?: PostVoteScalarWhereInput | Enumerable<PostVoteScalarWhereInput>;
  upsert?:
    | PostVoteUpsertWithWhereUniqueWithoutPostInput
    | Enumerable<PostVoteUpsertWithWhereUniqueWithoutPostInput>;
};

export type PostCommentCreateOneWithoutChildCommentsInput = {
  create?: PostCommentCreateWithoutChildCommentsInput;
  connect?: PostCommentWhereUniqueInput;
};

export type PostCreateOneWithoutCommentsInput = {
  create?: PostCreateWithoutCommentsInput;
  connect?: PostWhereUniqueInput;
};

export type UserCreateOneWithoutCommentsInput = {
  create?: UserCreateWithoutCommentsInput;
  connect?: UserWhereUniqueInput;
};

export type PostCommentCreateManyWithoutParentCommentInput = {
  create?:
    | PostCommentCreateWithoutParentCommentInput
    | Enumerable<PostCommentCreateWithoutParentCommentInput>;
  connect?:
    | PostCommentWhereUniqueInput
    | Enumerable<PostCommentWhereUniqueInput>;
};

export type PostCommentVoteCreateManyWithoutCommentInput = {
  create?:
    | PostCommentVoteCreateWithoutCommentInput
    | Enumerable<PostCommentVoteCreateWithoutCommentInput>;
  connect?:
    | PostCommentVoteWhereUniqueInput
    | Enumerable<PostCommentVoteWhereUniqueInput>;
};

export type PostCommentUpdateOneRequiredWithoutChildCommentsInput = {
  create?: PostCommentCreateWithoutChildCommentsInput;
  connect?: PostCommentWhereUniqueInput;
  update?: PostCommentUpdateWithoutChildCommentsDataInput;
  upsert?: PostCommentUpsertWithoutChildCommentsInput;
};

export type PostUpdateOneRequiredWithoutCommentsInput = {
  create?: PostCreateWithoutCommentsInput;
  connect?: PostWhereUniqueInput;
  update?: PostUpdateWithoutCommentsDataInput;
  upsert?: PostUpsertWithoutCommentsInput;
};

export type UserUpdateOneRequiredWithoutCommentsInput = {
  create?: UserCreateWithoutCommentsInput;
  connect?: UserWhereUniqueInput;
  update?: UserUpdateWithoutCommentsDataInput;
  upsert?: UserUpsertWithoutCommentsInput;
};

export type PostCommentUpdateManyWithoutParentCommentInput = {
  create?:
    | PostCommentCreateWithoutParentCommentInput
    | Enumerable<PostCommentCreateWithoutParentCommentInput>;
  connect?:
    | PostCommentWhereUniqueInput
    | Enumerable<PostCommentWhereUniqueInput>;
  set?: PostCommentWhereUniqueInput | Enumerable<PostCommentWhereUniqueInput>;
  disconnect?:
    | PostCommentWhereUniqueInput
    | Enumerable<PostCommentWhereUniqueInput>;
  delete?:
    | PostCommentWhereUniqueInput
    | Enumerable<PostCommentWhereUniqueInput>;
  update?:
    | PostCommentUpdateWithWhereUniqueWithoutParentCommentInput
    | Enumerable<PostCommentUpdateWithWhereUniqueWithoutParentCommentInput>;
  updateMany?:
    | PostCommentUpdateManyWithWhereNestedInput
    | Enumerable<PostCommentUpdateManyWithWhereNestedInput>;
  deleteMany?:
    | PostCommentScalarWhereInput
    | Enumerable<PostCommentScalarWhereInput>;
  upsert?:
    | PostCommentUpsertWithWhereUniqueWithoutParentCommentInput
    | Enumerable<PostCommentUpsertWithWhereUniqueWithoutParentCommentInput>;
};

export type PostCommentVoteUpdateManyWithoutCommentInput = {
  create?:
    | PostCommentVoteCreateWithoutCommentInput
    | Enumerable<PostCommentVoteCreateWithoutCommentInput>;
  connect?:
    | PostCommentVoteWhereUniqueInput
    | Enumerable<PostCommentVoteWhereUniqueInput>;
  set?:
    | PostCommentVoteWhereUniqueInput
    | Enumerable<PostCommentVoteWhereUniqueInput>;
  disconnect?:
    | PostCommentVoteWhereUniqueInput
    | Enumerable<PostCommentVoteWhereUniqueInput>;
  delete?:
    | PostCommentVoteWhereUniqueInput
    | Enumerable<PostCommentVoteWhereUniqueInput>;
  update?:
    | PostCommentVoteUpdateWithWhereUniqueWithoutCommentInput
    | Enumerable<PostCommentVoteUpdateWithWhereUniqueWithoutCommentInput>;
  updateMany?:
    | PostCommentVoteUpdateManyWithWhereNestedInput
    | Enumerable<PostCommentVoteUpdateManyWithWhereNestedInput>;
  deleteMany?:
    | PostCommentVoteScalarWhereInput
    | Enumerable<PostCommentVoteScalarWhereInput>;
  upsert?:
    | PostCommentVoteUpsertWithWhereUniqueWithoutCommentInput
    | Enumerable<PostCommentVoteUpsertWithWhereUniqueWithoutCommentInput>;
};

export type PostCommentCreateOneWithoutVotesInput = {
  create?: PostCommentCreateWithoutVotesInput;
  connect?: PostCommentWhereUniqueInput;
};

export type UserCreateOneWithoutCommentVotesInput = {
  create?: UserCreateWithoutCommentVotesInput;
  connect?: UserWhereUniqueInput;
};

export type IntFieldUpdateOperationsInput = {
  set?: number;
  increment?: number;
  decrement?: number;
  multiply?: number;
  divide?: number;
};

export type PostCommentUpdateOneRequiredWithoutVotesInput = {
  create?: PostCommentCreateWithoutVotesInput;
  connect?: PostCommentWhereUniqueInput;
  update?: PostCommentUpdateWithoutVotesDataInput;
  upsert?: PostCommentUpsertWithoutVotesInput;
};

export type UserUpdateOneRequiredWithoutCommentVotesInput = {
  create?: UserCreateWithoutCommentVotesInput;
  connect?: UserWhereUniqueInput;
  update?: UserUpdateWithoutCommentVotesDataInput;
  upsert?: UserUpsertWithoutCommentVotesInput;
};

export type PostCreateOneWithoutVotesInput = {
  create?: PostCreateWithoutVotesInput;
  connect?: PostWhereUniqueInput;
};

export type UserCreateOneWithoutPostVotesInput = {
  create?: UserCreateWithoutPostVotesInput;
  connect?: UserWhereUniqueInput;
};

export type PostUpdateOneRequiredWithoutVotesInput = {
  create?: PostCreateWithoutVotesInput;
  connect?: PostWhereUniqueInput;
  update?: PostUpdateWithoutVotesDataInput;
  upsert?: PostUpsertWithoutVotesInput;
};

export type UserUpdateOneRequiredWithoutPostVotesInput = {
  create?: UserCreateWithoutPostVotesInput;
  connect?: UserWhereUniqueInput;
  update?: UserUpdateWithoutPostVotesDataInput;
  upsert?: UserUpsertWithoutPostVotesInput;
};

export type GroupUserCreateManyWithoutUserInput = {
  create?:
    | GroupUserCreateWithoutUserInput
    | Enumerable<GroupUserCreateWithoutUserInput>;
  connect?: GroupUserWhereUniqueInput | Enumerable<GroupUserWhereUniqueInput>;
};

export type PostCreateManyWithoutUserInput = {
  create?: PostCreateWithoutUserInput | Enumerable<PostCreateWithoutUserInput>;
  connect?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>;
};

export type PostCommentCreateManyWithoutUserInput = {
  create?:
    | PostCommentCreateWithoutUserInput
    | Enumerable<PostCommentCreateWithoutUserInput>;
  connect?:
    | PostCommentWhereUniqueInput
    | Enumerable<PostCommentWhereUniqueInput>;
};

export type PostCommentVoteCreateManyWithoutUserInput = {
  create?:
    | PostCommentVoteCreateWithoutUserInput
    | Enumerable<PostCommentVoteCreateWithoutUserInput>;
  connect?:
    | PostCommentVoteWhereUniqueInput
    | Enumerable<PostCommentVoteWhereUniqueInput>;
};

export type PostVoteCreateManyWithoutUserInput = {
  create?:
    | PostVoteCreateWithoutUserInput
    | Enumerable<PostVoteCreateWithoutUserInput>;
  connect?: PostVoteWhereUniqueInput | Enumerable<PostVoteWhereUniqueInput>;
};

export type EnumUserRoleFieldUpdateOperationsInput = {
  set?: UserRole;
};

export type BoolFieldUpdateOperationsInput = {
  set?: boolean;
};

export type GroupUserUpdateManyWithoutUserInput = {
  create?:
    | GroupUserCreateWithoutUserInput
    | Enumerable<GroupUserCreateWithoutUserInput>;
  connect?: GroupUserWhereUniqueInput | Enumerable<GroupUserWhereUniqueInput>;
  set?: GroupUserWhereUniqueInput | Enumerable<GroupUserWhereUniqueInput>;
  disconnect?:
    | GroupUserWhereUniqueInput
    | Enumerable<GroupUserWhereUniqueInput>;
  delete?: GroupUserWhereUniqueInput | Enumerable<GroupUserWhereUniqueInput>;
  update?:
    | GroupUserUpdateWithWhereUniqueWithoutUserInput
    | Enumerable<GroupUserUpdateWithWhereUniqueWithoutUserInput>;
  updateMany?:
    | GroupUserUpdateManyWithWhereNestedInput
    | Enumerable<GroupUserUpdateManyWithWhereNestedInput>;
  deleteMany?:
    | GroupUserScalarWhereInput
    | Enumerable<GroupUserScalarWhereInput>;
  upsert?:
    | GroupUserUpsertWithWhereUniqueWithoutUserInput
    | Enumerable<GroupUserUpsertWithWhereUniqueWithoutUserInput>;
};

export type PostUpdateManyWithoutUserInput = {
  create?: PostCreateWithoutUserInput | Enumerable<PostCreateWithoutUserInput>;
  connect?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>;
  set?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>;
  disconnect?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>;
  delete?: PostWhereUniqueInput | Enumerable<PostWhereUniqueInput>;
  update?:
    | PostUpdateWithWhereUniqueWithoutUserInput
    | Enumerable<PostUpdateWithWhereUniqueWithoutUserInput>;
  updateMany?:
    | PostUpdateManyWithWhereNestedInput
    | Enumerable<PostUpdateManyWithWhereNestedInput>;
  deleteMany?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>;
  upsert?:
    | PostUpsertWithWhereUniqueWithoutUserInput
    | Enumerable<PostUpsertWithWhereUniqueWithoutUserInput>;
};

export type PostCommentUpdateManyWithoutUserInput = {
  create?:
    | PostCommentCreateWithoutUserInput
    | Enumerable<PostCommentCreateWithoutUserInput>;
  connect?:
    | PostCommentWhereUniqueInput
    | Enumerable<PostCommentWhereUniqueInput>;
  set?: PostCommentWhereUniqueInput | Enumerable<PostCommentWhereUniqueInput>;
  disconnect?:
    | PostCommentWhereUniqueInput
    | Enumerable<PostCommentWhereUniqueInput>;
  delete?:
    | PostCommentWhereUniqueInput
    | Enumerable<PostCommentWhereUniqueInput>;
  update?:
    | PostCommentUpdateWithWhereUniqueWithoutUserInput
    | Enumerable<PostCommentUpdateWithWhereUniqueWithoutUserInput>;
  updateMany?:
    | PostCommentUpdateManyWithWhereNestedInput
    | Enumerable<PostCommentUpdateManyWithWhereNestedInput>;
  deleteMany?:
    | PostCommentScalarWhereInput
    | Enumerable<PostCommentScalarWhereInput>;
  upsert?:
    | PostCommentUpsertWithWhereUniqueWithoutUserInput
    | Enumerable<PostCommentUpsertWithWhereUniqueWithoutUserInput>;
};

export type PostCommentVoteUpdateManyWithoutUserInput = {
  create?:
    | PostCommentVoteCreateWithoutUserInput
    | Enumerable<PostCommentVoteCreateWithoutUserInput>;
  connect?:
    | PostCommentVoteWhereUniqueInput
    | Enumerable<PostCommentVoteWhereUniqueInput>;
  set?:
    | PostCommentVoteWhereUniqueInput
    | Enumerable<PostCommentVoteWhereUniqueInput>;
  disconnect?:
    | PostCommentVoteWhereUniqueInput
    | Enumerable<PostCommentVoteWhereUniqueInput>;
  delete?:
    | PostCommentVoteWhereUniqueInput
    | Enumerable<PostCommentVoteWhereUniqueInput>;
  update?:
    | PostCommentVoteUpdateWithWhereUniqueWithoutUserInput
    | Enumerable<PostCommentVoteUpdateWithWhereUniqueWithoutUserInput>;
  updateMany?:
    | PostCommentVoteUpdateManyWithWhereNestedInput
    | Enumerable<PostCommentVoteUpdateManyWithWhereNestedInput>;
  deleteMany?:
    | PostCommentVoteScalarWhereInput
    | Enumerable<PostCommentVoteScalarWhereInput>;
  upsert?:
    | PostCommentVoteUpsertWithWhereUniqueWithoutUserInput
    | Enumerable<PostCommentVoteUpsertWithWhereUniqueWithoutUserInput>;
};

export type PostVoteUpdateManyWithoutUserInput = {
  create?:
    | PostVoteCreateWithoutUserInput
    | Enumerable<PostVoteCreateWithoutUserInput>;
  connect?: PostVoteWhereUniqueInput | Enumerable<PostVoteWhereUniqueInput>;
  set?: PostVoteWhereUniqueInput | Enumerable<PostVoteWhereUniqueInput>;
  disconnect?: PostVoteWhereUniqueInput | Enumerable<PostVoteWhereUniqueInput>;
  delete?: PostVoteWhereUniqueInput | Enumerable<PostVoteWhereUniqueInput>;
  update?:
    | PostVoteUpdateWithWhereUniqueWithoutUserInput
    | Enumerable<PostVoteUpdateWithWhereUniqueWithoutUserInput>;
  updateMany?:
    | PostVoteUpdateManyWithWhereNestedInput
    | Enumerable<PostVoteUpdateManyWithWhereNestedInput>;
  deleteMany?: PostVoteScalarWhereInput | Enumerable<PostVoteScalarWhereInput>;
  upsert?:
    | PostVoteUpsertWithWhereUniqueWithoutUserInput
    | Enumerable<PostVoteUpsertWithWhereUniqueWithoutUserInput>;
};

export type NestedIntFilter = {
  equals?: number;
  in?: Enumerable<number>;
  notIn?: Enumerable<number>;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: number | NestedIntFilter;
};

export type NestedStringFilter = {
  equals?: string;
  in?: Enumerable<string>;
  notIn?: Enumerable<string>;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  not?: string | NestedStringFilter;
};

export type NestedStringNullableFilter = {
  equals?: string | null;
  in?: Enumerable<string> | null;
  notIn?: Enumerable<string> | null;
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  not?: string | NestedStringNullableFilter | null;
};

export type NestedEnumGroupUserRoleNullableFilter = {
  equals?: GroupUserRole | null;
  in?: Enumerable<GroupUserRole> | null;
  notIn?: Enumerable<GroupUserRole> | null;
  not?: GroupUserRole | NestedEnumGroupUserRoleNullableFilter | null;
};

export type NestedDateTimeFilter = {
  equals?: Date | string;
  in?: Enumerable<Date> | Enumerable<string>;
  notIn?: Enumerable<Date> | Enumerable<string>;
  lt?: Date | string;
  lte?: Date | string;
  gt?: Date | string;
  gte?: Date | string;
  not?: Date | string | NestedDateTimeFilter;
};

export type NestedEnumUserRoleFilter = {
  equals?: UserRole;
  in?: Enumerable<UserRole>;
  notIn?: Enumerable<UserRole>;
  not?: UserRole | NestedEnumUserRoleFilter;
};

export type NestedBoolFilter = {
  equals?: boolean;
  not?: boolean | NestedBoolFilter;
};

export type GroupUserCreateWithoutGroupInput = {
  role?: GroupUserRole | null;
  user: UserCreateOneWithoutGroupUsersInput;
};

export type PostCreateWithoutGroupInput = {
  title: string;
  content: string;
  media?: string | null;
  createdDate?: Date | string;
  updatedDate?: Date | string;
  user: UserCreateOneWithoutPostsInput;
  comments?: PostCommentCreateManyWithoutPostInput;
  votes?: PostVoteCreateManyWithoutPostInput;
};

export type GroupUserUpdateWithWhereUniqueWithoutGroupInput = {
  where: GroupUserWhereUniqueInput;
  data: GroupUserUpdateWithoutGroupDataInput;
};

export type GroupUserUpdateManyWithWhereNestedInput = {
  where: GroupUserScalarWhereInput;
  data: GroupUserUpdateManyDataInput;
};

export type GroupUserScalarWhereInput = {
  AND?: GroupUserScalarWhereInput | Enumerable<GroupUserScalarWhereInput>;
  OR?: GroupUserScalarWhereInput | Enumerable<GroupUserScalarWhereInput>;
  NOT?: GroupUserScalarWhereInput | Enumerable<GroupUserScalarWhereInput>;
  groupId?: IntFilter | number;
  userId?: IntFilter | number;
  role?: EnumGroupUserRoleNullableFilter | GroupUserRole | null;
};

export type GroupUserUpsertWithWhereUniqueWithoutGroupInput = {
  where: GroupUserWhereUniqueInput;
  update: GroupUserUpdateWithoutGroupDataInput;
  create: GroupUserCreateWithoutGroupInput;
};

export type PostUpdateWithWhereUniqueWithoutGroupInput = {
  where: PostWhereUniqueInput;
  data: PostUpdateWithoutGroupDataInput;
};

export type PostUpdateManyWithWhereNestedInput = {
  where: PostScalarWhereInput;
  data: PostUpdateManyDataInput;
};

export type PostScalarWhereInput = {
  AND?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>;
  OR?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>;
  NOT?: PostScalarWhereInput | Enumerable<PostScalarWhereInput>;
  id?: IntFilter | number;
  groupId?: IntFilter | number;
  userId?: IntFilter | number;
  title?: StringFilter | string;
  content?: StringFilter | string;
  media?: StringNullableFilter | string | null;
  createdDate?: DateTimeFilter | Date | string;
  updatedDate?: DateTimeFilter | Date | string;
};

export type PostUpsertWithWhereUniqueWithoutGroupInput = {
  where: PostWhereUniqueInput;
  update: PostUpdateWithoutGroupDataInput;
  create: PostCreateWithoutGroupInput;
};

export type GroupCreateWithoutUsersInput = {
  name: string;
  description: string;
  title?: string | null;
  posts?: PostCreateManyWithoutGroupInput;
};

export type UserCreateWithoutGroupUsersInput = {
  username: string;
  email: string;
  password: string;
  karma: number;
  role: UserRole;
  emailVerified?: boolean;
  posts?: PostCreateManyWithoutUserInput;
  comments?: PostCommentCreateManyWithoutUserInput;
  commentVotes?: PostCommentVoteCreateManyWithoutUserInput;
  postVotes?: PostVoteCreateManyWithoutUserInput;
};

export type GroupUpdateWithoutUsersDataInput = {
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | StringFieldUpdateOperationsInput;
  title?: string | NullableStringFieldUpdateOperationsInput | null;
  posts?: PostUpdateManyWithoutGroupInput;
};

export type GroupUpsertWithoutUsersInput = {
  update: GroupUpdateWithoutUsersDataInput;
  create: GroupCreateWithoutUsersInput;
};

export type UserUpdateWithoutGroupUsersDataInput = {
  username?: string | StringFieldUpdateOperationsInput;
  email?: string | StringFieldUpdateOperationsInput;
  password?: string | StringFieldUpdateOperationsInput;
  karma?: number | IntFieldUpdateOperationsInput;
  role?: UserRole | EnumUserRoleFieldUpdateOperationsInput;
  emailVerified?: boolean | BoolFieldUpdateOperationsInput;
  posts?: PostUpdateManyWithoutUserInput;
  comments?: PostCommentUpdateManyWithoutUserInput;
  commentVotes?: PostCommentVoteUpdateManyWithoutUserInput;
  postVotes?: PostVoteUpdateManyWithoutUserInput;
};

export type UserUpsertWithoutGroupUsersInput = {
  update: UserUpdateWithoutGroupUsersDataInput;
  create: UserCreateWithoutGroupUsersInput;
};

export type GroupCreateWithoutPostsInput = {
  name: string;
  description: string;
  title?: string | null;
  users?: GroupUserCreateManyWithoutGroupInput;
};

export type UserCreateWithoutPostsInput = {
  username: string;
  email: string;
  password: string;
  karma: number;
  role: UserRole;
  emailVerified?: boolean;
  groupUsers?: GroupUserCreateManyWithoutUserInput;
  comments?: PostCommentCreateManyWithoutUserInput;
  commentVotes?: PostCommentVoteCreateManyWithoutUserInput;
  postVotes?: PostVoteCreateManyWithoutUserInput;
};

export type PostCommentCreateWithoutPostInput = {
  content: string;
  parentComment: PostCommentCreateOneWithoutChildCommentsInput;
  user: UserCreateOneWithoutCommentsInput;
  childComments?: PostCommentCreateManyWithoutParentCommentInput;
  votes?: PostCommentVoteCreateManyWithoutCommentInput;
};

export type PostVoteCreateWithoutPostInput = {
  createdDatetime?: Date | string;
  voteType: number;
  updatedDatetime: Date | string;
  user: UserCreateOneWithoutPostVotesInput;
};

export type GroupUpdateWithoutPostsDataInput = {
  name?: string | StringFieldUpdateOperationsInput;
  description?: string | StringFieldUpdateOperationsInput;
  title?: string | NullableStringFieldUpdateOperationsInput | null;
  users?: GroupUserUpdateManyWithoutGroupInput;
};

export type GroupUpsertWithoutPostsInput = {
  update: GroupUpdateWithoutPostsDataInput;
  create: GroupCreateWithoutPostsInput;
};

export type UserUpdateWithoutPostsDataInput = {
  username?: string | StringFieldUpdateOperationsInput;
  email?: string | StringFieldUpdateOperationsInput;
  password?: string | StringFieldUpdateOperationsInput;
  karma?: number | IntFieldUpdateOperationsInput;
  role?: UserRole | EnumUserRoleFieldUpdateOperationsInput;
  emailVerified?: boolean | BoolFieldUpdateOperationsInput;
  groupUsers?: GroupUserUpdateManyWithoutUserInput;
  comments?: PostCommentUpdateManyWithoutUserInput;
  commentVotes?: PostCommentVoteUpdateManyWithoutUserInput;
  postVotes?: PostVoteUpdateManyWithoutUserInput;
};

export type UserUpsertWithoutPostsInput = {
  update: UserUpdateWithoutPostsDataInput;
  create: UserCreateWithoutPostsInput;
};

export type PostCommentUpdateWithWhereUniqueWithoutPostInput = {
  where: PostCommentWhereUniqueInput;
  data: PostCommentUpdateWithoutPostDataInput;
};

export type PostCommentUpdateManyWithWhereNestedInput = {
  where: PostCommentScalarWhereInput;
  data: PostCommentUpdateManyDataInput;
};

export type PostCommentScalarWhereInput = {
  AND?: PostCommentScalarWhereInput | Enumerable<PostCommentScalarWhereInput>;
  OR?: PostCommentScalarWhereInput | Enumerable<PostCommentScalarWhereInput>;
  NOT?: PostCommentScalarWhereInput | Enumerable<PostCommentScalarWhereInput>;
  id?: IntFilter | number;
  postId?: IntFilter | number;
  userId?: IntFilter | number;
  parentCommentId?: IntFilter | number;
  content?: StringFilter | string;
};

export type PostCommentUpsertWithWhereUniqueWithoutPostInput = {
  where: PostCommentWhereUniqueInput;
  update: PostCommentUpdateWithoutPostDataInput;
  create: PostCommentCreateWithoutPostInput;
};

export type PostVoteUpdateWithWhereUniqueWithoutPostInput = {
  where: PostVoteWhereUniqueInput;
  data: PostVoteUpdateWithoutPostDataInput;
};

export type PostVoteUpdateManyWithWhereNestedInput = {
  where: PostVoteScalarWhereInput;
  data: PostVoteUpdateManyDataInput;
};

export type PostVoteScalarWhereInput = {
  AND?: PostVoteScalarWhereInput | Enumerable<PostVoteScalarWhereInput>;
  OR?: PostVoteScalarWhereInput | Enumerable<PostVoteScalarWhereInput>;
  NOT?: PostVoteScalarWhereInput | Enumerable<PostVoteScalarWhereInput>;
  postId?: IntFilter | number;
  userId?: IntFilter | number;
  createdDatetime?: DateTimeFilter | Date | string;
  voteType?: IntFilter | number;
  updatedDatetime?: DateTimeFilter | Date | string;
};

export type PostVoteUpsertWithWhereUniqueWithoutPostInput = {
  where: PostVoteWhereUniqueInput;
  update: PostVoteUpdateWithoutPostDataInput;
  create: PostVoteCreateWithoutPostInput;
};

export type PostCommentCreateWithoutChildCommentsInput = {
  content: string;
  parentComment: PostCommentCreateOneWithoutChildCommentsInput;
  post: PostCreateOneWithoutCommentsInput;
  user: UserCreateOneWithoutCommentsInput;
  votes?: PostCommentVoteCreateManyWithoutCommentInput;
};

export type PostCreateWithoutCommentsInput = {
  title: string;
  content: string;
  media?: string | null;
  createdDate?: Date | string;
  updatedDate?: Date | string;
  group: GroupCreateOneWithoutPostsInput;
  user: UserCreateOneWithoutPostsInput;
  votes?: PostVoteCreateManyWithoutPostInput;
};

export type UserCreateWithoutCommentsInput = {
  username: string;
  email: string;
  password: string;
  karma: number;
  role: UserRole;
  emailVerified?: boolean;
  groupUsers?: GroupUserCreateManyWithoutUserInput;
  posts?: PostCreateManyWithoutUserInput;
  commentVotes?: PostCommentVoteCreateManyWithoutUserInput;
  postVotes?: PostVoteCreateManyWithoutUserInput;
};

export type PostCommentCreateWithoutParentCommentInput = {
  content: string;
  post: PostCreateOneWithoutCommentsInput;
  user: UserCreateOneWithoutCommentsInput;
  childComments?: PostCommentCreateManyWithoutParentCommentInput;
  votes?: PostCommentVoteCreateManyWithoutCommentInput;
};

export type PostCommentVoteCreateWithoutCommentInput = {
  createdDatetime?: Date | string;
  voteType: number;
  updatedDatetime: Date | string;
  user: UserCreateOneWithoutCommentVotesInput;
};

export type PostCommentUpdateWithoutChildCommentsDataInput = {
  content?: string | StringFieldUpdateOperationsInput;
  parentComment?: PostCommentUpdateOneRequiredWithoutChildCommentsInput;
  post?: PostUpdateOneRequiredWithoutCommentsInput;
  user?: UserUpdateOneRequiredWithoutCommentsInput;
  votes?: PostCommentVoteUpdateManyWithoutCommentInput;
};

export type PostCommentUpsertWithoutChildCommentsInput = {
  update: PostCommentUpdateWithoutChildCommentsDataInput;
  create: PostCommentCreateWithoutChildCommentsInput;
};

export type PostUpdateWithoutCommentsDataInput = {
  title?: string | StringFieldUpdateOperationsInput;
  content?: string | StringFieldUpdateOperationsInput;
  media?: string | NullableStringFieldUpdateOperationsInput | null;
  createdDate?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedDate?: Date | string | DateTimeFieldUpdateOperationsInput;
  group?: GroupUpdateOneRequiredWithoutPostsInput;
  user?: UserUpdateOneRequiredWithoutPostsInput;
  votes?: PostVoteUpdateManyWithoutPostInput;
};

export type PostUpsertWithoutCommentsInput = {
  update: PostUpdateWithoutCommentsDataInput;
  create: PostCreateWithoutCommentsInput;
};

export type UserUpdateWithoutCommentsDataInput = {
  username?: string | StringFieldUpdateOperationsInput;
  email?: string | StringFieldUpdateOperationsInput;
  password?: string | StringFieldUpdateOperationsInput;
  karma?: number | IntFieldUpdateOperationsInput;
  role?: UserRole | EnumUserRoleFieldUpdateOperationsInput;
  emailVerified?: boolean | BoolFieldUpdateOperationsInput;
  groupUsers?: GroupUserUpdateManyWithoutUserInput;
  posts?: PostUpdateManyWithoutUserInput;
  commentVotes?: PostCommentVoteUpdateManyWithoutUserInput;
  postVotes?: PostVoteUpdateManyWithoutUserInput;
};

export type UserUpsertWithoutCommentsInput = {
  update: UserUpdateWithoutCommentsDataInput;
  create: UserCreateWithoutCommentsInput;
};

export type PostCommentUpdateWithWhereUniqueWithoutParentCommentInput = {
  where: PostCommentWhereUniqueInput;
  data: PostCommentUpdateWithoutParentCommentDataInput;
};

export type PostCommentUpsertWithWhereUniqueWithoutParentCommentInput = {
  where: PostCommentWhereUniqueInput;
  update: PostCommentUpdateWithoutParentCommentDataInput;
  create: PostCommentCreateWithoutParentCommentInput;
};

export type PostCommentVoteUpdateWithWhereUniqueWithoutCommentInput = {
  where: PostCommentVoteWhereUniqueInput;
  data: PostCommentVoteUpdateWithoutCommentDataInput;
};

export type PostCommentVoteUpdateManyWithWhereNestedInput = {
  where: PostCommentVoteScalarWhereInput;
  data: PostCommentVoteUpdateManyDataInput;
};

export type PostCommentVoteScalarWhereInput = {
  AND?:
    | PostCommentVoteScalarWhereInput
    | Enumerable<PostCommentVoteScalarWhereInput>;
  OR?:
    | PostCommentVoteScalarWhereInput
    | Enumerable<PostCommentVoteScalarWhereInput>;
  NOT?:
    | PostCommentVoteScalarWhereInput
    | Enumerable<PostCommentVoteScalarWhereInput>;
  commentId?: IntFilter | number;
  userId?: IntFilter | number;
  createdDatetime?: DateTimeFilter | Date | string;
  voteType?: IntFilter | number;
  updatedDatetime?: DateTimeFilter | Date | string;
};

export type PostCommentVoteUpsertWithWhereUniqueWithoutCommentInput = {
  where: PostCommentVoteWhereUniqueInput;
  update: PostCommentVoteUpdateWithoutCommentDataInput;
  create: PostCommentVoteCreateWithoutCommentInput;
};

export type PostCommentCreateWithoutVotesInput = {
  content: string;
  parentComment: PostCommentCreateOneWithoutChildCommentsInput;
  post: PostCreateOneWithoutCommentsInput;
  user: UserCreateOneWithoutCommentsInput;
  childComments?: PostCommentCreateManyWithoutParentCommentInput;
};

export type UserCreateWithoutCommentVotesInput = {
  username: string;
  email: string;
  password: string;
  karma: number;
  role: UserRole;
  emailVerified?: boolean;
  groupUsers?: GroupUserCreateManyWithoutUserInput;
  posts?: PostCreateManyWithoutUserInput;
  comments?: PostCommentCreateManyWithoutUserInput;
  postVotes?: PostVoteCreateManyWithoutUserInput;
};

export type PostCommentUpdateWithoutVotesDataInput = {
  content?: string | StringFieldUpdateOperationsInput;
  parentComment?: PostCommentUpdateOneRequiredWithoutChildCommentsInput;
  post?: PostUpdateOneRequiredWithoutCommentsInput;
  user?: UserUpdateOneRequiredWithoutCommentsInput;
  childComments?: PostCommentUpdateManyWithoutParentCommentInput;
};

export type PostCommentUpsertWithoutVotesInput = {
  update: PostCommentUpdateWithoutVotesDataInput;
  create: PostCommentCreateWithoutVotesInput;
};

export type UserUpdateWithoutCommentVotesDataInput = {
  username?: string | StringFieldUpdateOperationsInput;
  email?: string | StringFieldUpdateOperationsInput;
  password?: string | StringFieldUpdateOperationsInput;
  karma?: number | IntFieldUpdateOperationsInput;
  role?: UserRole | EnumUserRoleFieldUpdateOperationsInput;
  emailVerified?: boolean | BoolFieldUpdateOperationsInput;
  groupUsers?: GroupUserUpdateManyWithoutUserInput;
  posts?: PostUpdateManyWithoutUserInput;
  comments?: PostCommentUpdateManyWithoutUserInput;
  postVotes?: PostVoteUpdateManyWithoutUserInput;
};

export type UserUpsertWithoutCommentVotesInput = {
  update: UserUpdateWithoutCommentVotesDataInput;
  create: UserCreateWithoutCommentVotesInput;
};

export type PostCreateWithoutVotesInput = {
  title: string;
  content: string;
  media?: string | null;
  createdDate?: Date | string;
  updatedDate?: Date | string;
  group: GroupCreateOneWithoutPostsInput;
  user: UserCreateOneWithoutPostsInput;
  comments?: PostCommentCreateManyWithoutPostInput;
};

export type UserCreateWithoutPostVotesInput = {
  username: string;
  email: string;
  password: string;
  karma: number;
  role: UserRole;
  emailVerified?: boolean;
  groupUsers?: GroupUserCreateManyWithoutUserInput;
  posts?: PostCreateManyWithoutUserInput;
  comments?: PostCommentCreateManyWithoutUserInput;
  commentVotes?: PostCommentVoteCreateManyWithoutUserInput;
};

export type PostUpdateWithoutVotesDataInput = {
  title?: string | StringFieldUpdateOperationsInput;
  content?: string | StringFieldUpdateOperationsInput;
  media?: string | NullableStringFieldUpdateOperationsInput | null;
  createdDate?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedDate?: Date | string | DateTimeFieldUpdateOperationsInput;
  group?: GroupUpdateOneRequiredWithoutPostsInput;
  user?: UserUpdateOneRequiredWithoutPostsInput;
  comments?: PostCommentUpdateManyWithoutPostInput;
};

export type PostUpsertWithoutVotesInput = {
  update: PostUpdateWithoutVotesDataInput;
  create: PostCreateWithoutVotesInput;
};

export type UserUpdateWithoutPostVotesDataInput = {
  username?: string | StringFieldUpdateOperationsInput;
  email?: string | StringFieldUpdateOperationsInput;
  password?: string | StringFieldUpdateOperationsInput;
  karma?: number | IntFieldUpdateOperationsInput;
  role?: UserRole | EnumUserRoleFieldUpdateOperationsInput;
  emailVerified?: boolean | BoolFieldUpdateOperationsInput;
  groupUsers?: GroupUserUpdateManyWithoutUserInput;
  posts?: PostUpdateManyWithoutUserInput;
  comments?: PostCommentUpdateManyWithoutUserInput;
  commentVotes?: PostCommentVoteUpdateManyWithoutUserInput;
};

export type UserUpsertWithoutPostVotesInput = {
  update: UserUpdateWithoutPostVotesDataInput;
  create: UserCreateWithoutPostVotesInput;
};

export type GroupUserCreateWithoutUserInput = {
  role?: GroupUserRole | null;
  group: GroupCreateOneWithoutUsersInput;
};

export type PostCreateWithoutUserInput = {
  title: string;
  content: string;
  media?: string | null;
  createdDate?: Date | string;
  updatedDate?: Date | string;
  group: GroupCreateOneWithoutPostsInput;
  comments?: PostCommentCreateManyWithoutPostInput;
  votes?: PostVoteCreateManyWithoutPostInput;
};

export type PostCommentCreateWithoutUserInput = {
  content: string;
  parentComment: PostCommentCreateOneWithoutChildCommentsInput;
  post: PostCreateOneWithoutCommentsInput;
  childComments?: PostCommentCreateManyWithoutParentCommentInput;
  votes?: PostCommentVoteCreateManyWithoutCommentInput;
};

export type PostCommentVoteCreateWithoutUserInput = {
  createdDatetime?: Date | string;
  voteType: number;
  updatedDatetime: Date | string;
  comment: PostCommentCreateOneWithoutVotesInput;
};

export type PostVoteCreateWithoutUserInput = {
  createdDatetime?: Date | string;
  voteType: number;
  updatedDatetime: Date | string;
  post: PostCreateOneWithoutVotesInput;
};

export type GroupUserUpdateWithWhereUniqueWithoutUserInput = {
  where: GroupUserWhereUniqueInput;
  data: GroupUserUpdateWithoutUserDataInput;
};

export type GroupUserUpsertWithWhereUniqueWithoutUserInput = {
  where: GroupUserWhereUniqueInput;
  update: GroupUserUpdateWithoutUserDataInput;
  create: GroupUserCreateWithoutUserInput;
};

export type PostUpdateWithWhereUniqueWithoutUserInput = {
  where: PostWhereUniqueInput;
  data: PostUpdateWithoutUserDataInput;
};

export type PostUpsertWithWhereUniqueWithoutUserInput = {
  where: PostWhereUniqueInput;
  update: PostUpdateWithoutUserDataInput;
  create: PostCreateWithoutUserInput;
};

export type PostCommentUpdateWithWhereUniqueWithoutUserInput = {
  where: PostCommentWhereUniqueInput;
  data: PostCommentUpdateWithoutUserDataInput;
};

export type PostCommentUpsertWithWhereUniqueWithoutUserInput = {
  where: PostCommentWhereUniqueInput;
  update: PostCommentUpdateWithoutUserDataInput;
  create: PostCommentCreateWithoutUserInput;
};

export type PostCommentVoteUpdateWithWhereUniqueWithoutUserInput = {
  where: PostCommentVoteWhereUniqueInput;
  data: PostCommentVoteUpdateWithoutUserDataInput;
};

export type PostCommentVoteUpsertWithWhereUniqueWithoutUserInput = {
  where: PostCommentVoteWhereUniqueInput;
  update: PostCommentVoteUpdateWithoutUserDataInput;
  create: PostCommentVoteCreateWithoutUserInput;
};

export type PostVoteUpdateWithWhereUniqueWithoutUserInput = {
  where: PostVoteWhereUniqueInput;
  data: PostVoteUpdateWithoutUserDataInput;
};

export type PostVoteUpsertWithWhereUniqueWithoutUserInput = {
  where: PostVoteWhereUniqueInput;
  update: PostVoteUpdateWithoutUserDataInput;
  create: PostVoteCreateWithoutUserInput;
};

export type GroupUserUpdateWithoutGroupDataInput = {
  role?:
    | GroupUserRole
    | NullableEnumGroupUserRoleFieldUpdateOperationsInput
    | null;
  user?: UserUpdateOneRequiredWithoutGroupUsersInput;
};

export type GroupUserUpdateManyDataInput = {
  role?:
    | GroupUserRole
    | NullableEnumGroupUserRoleFieldUpdateOperationsInput
    | null;
};

export type PostUpdateWithoutGroupDataInput = {
  title?: string | StringFieldUpdateOperationsInput;
  content?: string | StringFieldUpdateOperationsInput;
  media?: string | NullableStringFieldUpdateOperationsInput | null;
  createdDate?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedDate?: Date | string | DateTimeFieldUpdateOperationsInput;
  user?: UserUpdateOneRequiredWithoutPostsInput;
  comments?: PostCommentUpdateManyWithoutPostInput;
  votes?: PostVoteUpdateManyWithoutPostInput;
};

export type PostUpdateManyDataInput = {
  title?: string | StringFieldUpdateOperationsInput;
  content?: string | StringFieldUpdateOperationsInput;
  media?: string | NullableStringFieldUpdateOperationsInput | null;
  createdDate?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedDate?: Date | string | DateTimeFieldUpdateOperationsInput;
};

export type PostCommentUpdateWithoutPostDataInput = {
  content?: string | StringFieldUpdateOperationsInput;
  parentComment?: PostCommentUpdateOneRequiredWithoutChildCommentsInput;
  user?: UserUpdateOneRequiredWithoutCommentsInput;
  childComments?: PostCommentUpdateManyWithoutParentCommentInput;
  votes?: PostCommentVoteUpdateManyWithoutCommentInput;
};

export type PostCommentUpdateManyDataInput = {
  content?: string | StringFieldUpdateOperationsInput;
};

export type PostVoteUpdateWithoutPostDataInput = {
  createdDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
  voteType?: number | IntFieldUpdateOperationsInput;
  updatedDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
  user?: UserUpdateOneRequiredWithoutPostVotesInput;
};

export type PostVoteUpdateManyDataInput = {
  createdDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
  voteType?: number | IntFieldUpdateOperationsInput;
  updatedDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
};

export type PostCommentUpdateWithoutParentCommentDataInput = {
  content?: string | StringFieldUpdateOperationsInput;
  post?: PostUpdateOneRequiredWithoutCommentsInput;
  user?: UserUpdateOneRequiredWithoutCommentsInput;
  childComments?: PostCommentUpdateManyWithoutParentCommentInput;
  votes?: PostCommentVoteUpdateManyWithoutCommentInput;
};

export type PostCommentVoteUpdateWithoutCommentDataInput = {
  createdDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
  voteType?: number | IntFieldUpdateOperationsInput;
  updatedDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
  user?: UserUpdateOneRequiredWithoutCommentVotesInput;
};

export type PostCommentVoteUpdateManyDataInput = {
  createdDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
  voteType?: number | IntFieldUpdateOperationsInput;
  updatedDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
};

export type GroupUserUpdateWithoutUserDataInput = {
  role?:
    | GroupUserRole
    | NullableEnumGroupUserRoleFieldUpdateOperationsInput
    | null;
  group?: GroupUpdateOneRequiredWithoutUsersInput;
};

export type PostUpdateWithoutUserDataInput = {
  title?: string | StringFieldUpdateOperationsInput;
  content?: string | StringFieldUpdateOperationsInput;
  media?: string | NullableStringFieldUpdateOperationsInput | null;
  createdDate?: Date | string | DateTimeFieldUpdateOperationsInput;
  updatedDate?: Date | string | DateTimeFieldUpdateOperationsInput;
  group?: GroupUpdateOneRequiredWithoutPostsInput;
  comments?: PostCommentUpdateManyWithoutPostInput;
  votes?: PostVoteUpdateManyWithoutPostInput;
};

export type PostCommentUpdateWithoutUserDataInput = {
  content?: string | StringFieldUpdateOperationsInput;
  parentComment?: PostCommentUpdateOneRequiredWithoutChildCommentsInput;
  post?: PostUpdateOneRequiredWithoutCommentsInput;
  childComments?: PostCommentUpdateManyWithoutParentCommentInput;
  votes?: PostCommentVoteUpdateManyWithoutCommentInput;
};

export type PostCommentVoteUpdateWithoutUserDataInput = {
  createdDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
  voteType?: number | IntFieldUpdateOperationsInput;
  updatedDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
  comment?: PostCommentUpdateOneRequiredWithoutVotesInput;
};

export type PostVoteUpdateWithoutUserDataInput = {
  createdDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
  voteType?: number | IntFieldUpdateOperationsInput;
  updatedDatetime?: Date | string | DateTimeFieldUpdateOperationsInput;
  post?: PostUpdateOneRequiredWithoutVotesInput;
};

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number;
};

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
