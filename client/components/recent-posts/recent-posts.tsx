import React from 'react';
import { createStyles, Grid, Paper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { RecentPost as RecentPostType } from '@bit/shashisrinath.9rush-types.postinterface';
import Link from 'next/link';
import { parseTimeSince } from '../../util/parse-time-since';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
    },
    postTitle: {
      margin: 0,
    },
    detailWrapper: {
      marginTop: theme.spacing(1),
      color: theme.palette.grey['600'],
    },
    postListingRoot: {
      width: '100%',
      boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.12)',
      padding: theme.spacing(2),
      '&:hover': {
        boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.15)',
      },
    },
  })
);

interface Props {
  posts: RecentPostType[];
}

const RecentPosts: React.FC<Props> = ({ posts }) => {
  const classes = useStyles();

  const PostListing: React.FC<{ post: RecentPostType }> = ({ post }) => (
    <Link href={`/g/${post.group.name}/posts/${post.id}`}>
      <a>
        <Grid
          container
          direction={'column'}
          className={classes.postListingRoot}
        >
          <Grid item>
            <h4 className={classes.postTitle}>{post.title}</h4>
          </Grid>
          <Grid item>
            <Grid
              container
              justify={'space-between'}
              className={classes.detailWrapper}
            >
              <Grid item>{post.voteCount} points</Grid>
              <Grid item>{post.commentCount} comments</Grid>
              <Grid item>{parseTimeSince(post.visitedTime)}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </a>
    </Link>
  );

  return (
    <Paper>
      <Grid container direction={'column'} className={classes.root} spacing={2}>
        <Grid item>
          <h4>Recent Posts</h4>
        </Grid>
        {posts.map((p) => (
          <Grid item>
            <PostListing post={p} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default RecentPosts;
