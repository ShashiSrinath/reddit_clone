import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Button,
  createStyles,
  Grid,
  IconButton,
  Paper,
  Theme,
} from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      padding: theme.spacing(2),

      '& p': {
        margin: 0,
      },
    },
    voteColumn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: 40,
      marginRight: 10,
    },
    voteColumnSkeleton: {
      marginBottom: theme.spacing(2),
    },
    rightColumn: {
      width: '100%',
    },
    groupName: {
      width: '100%',
    },
    postContentWrapper: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(2),
      minHeight: theme.spacing(20),
      maxHeight: theme.spacing(25),
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
    },
  })
);

const TimelinePostSkeleton: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper>
      <div className={classes.root}>
        <div className={classes.voteColumn}>
          <IconButton>
            <KeyboardArrowUp />
          </IconButton>

          <div>
            <Skeleton animation="wave" variant="rect" width={20} height={20} />
          </div>
          <IconButton>
            <KeyboardArrowDown />
          </IconButton>
        </div>
        <div className={classes.rightColumn}>
          <Grid container spacing={3} alignItems={'center'}>
            <Grid item>
              <Skeleton
                animation="wave"
                variant="circle"
                width={40}
                height={40}
              />
            </Grid>
          </Grid>
          <div className={classes.postContentWrapper}>
            <Skeleton animation="wave" width={'80%'} height={35} />
            <p>
              <Skeleton animation="wave" width={'90%'} height={25} />
              <Skeleton animation="wave" width={'90%'} height={25} />
              <Skeleton animation="wave" width={'90%'} height={25} />
              <Skeleton animation="wave" width={'90%'} height={25} />
            </p>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default TimelinePostSkeleton;
