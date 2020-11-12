import React from 'react';
import { createStyles, Grid, Paper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';

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

const RecentPosts: React.FC = () => {
  const classes = useStyles();

  const PostListing = ({ post }) => (
    <Link href={`/g/${post.group.name}/posts/${post.id}`}>
      <a>
        <Grid
          container
          direction={'column'}
          className={classes.postListingRoot}
        >
          <Grid item>
            <h4 className={classes.postTitle}>sample title 1</h4>
          </Grid>
          <Grid item>
            <Grid
              container
              justify={'space-between'}
              className={classes.detailWrapper}
            >
              <Grid item>5 points</Grid>
              <Grid item>2 comments</Grid>
              <Grid item>1 h ago</Grid>
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
        <Grid item>
          <PostListing post={{ group: { name: 'sad' }, id: 334 }} />
        </Grid>
        <Grid item>
          <PostListing post={{ group: { name: 'sad' }, id: 334 }} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RecentPosts;
