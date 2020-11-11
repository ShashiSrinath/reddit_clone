import React from 'react';
import {
  Avatar,
  Button,
  createStyles,
  Grid,
  Paper,
  Theme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Image from 'next/image';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    coverImageWrapper: {
      position: 'relative',
      width: '100%',
      height: theme.spacing(8),
    },
    avatar: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    titleRowWrapper: {
      margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    },
    descriptionRowWrapper: {
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(
        2
      )}px`,
    },
    createPostButtonWrapper: {
      margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      width: '100%',
    },
    createCommunityButtonWrapper: {
      margin: `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(
        5
      )}px ${theme.spacing(2)}px`,
      width: '100%',
    },
  })
);

const PageInfoLayout: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item className={classes.coverImageWrapper}>
          <Image src={'/home-post-info.jpg'} layout={'fill'} />
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={2}
            className={classes.titleRowWrapper}
            alignItems={'center'}
          >
            <Grid item>
              <Avatar alt="Home Page " src={'/home-profile.svg'} />
            </Grid>
            <Grid item>
              <h3>Home</h3>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.descriptionRowWrapper}>
          Your personal 9 Rush frontpage. Come here to check in with your
          favorite communities.
        </Grid>
        <Grid item className={classes.createPostButtonWrapper}>
          <Link href={'/create-post'}>
            <a>
              <Button fullWidth color={'primary'} variant={'contained'}>
                CREATE POST
              </Button>
            </a>
          </Link>
        </Grid>
        <Grid item className={classes.createCommunityButtonWrapper}>
          <Link href={'/create-group'}>
            <a>
              <Button fullWidth color={'primary'} variant={'outlined'}>
                CREATE COMMUNITY
              </Button>
            </a>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PageInfoLayout;
