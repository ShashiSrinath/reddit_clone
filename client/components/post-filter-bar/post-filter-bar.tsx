import React, { Dispatch, SetStateAction } from 'react';
import { Button, createStyles, Grid, Paper, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AcUnit, Whatshot } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(1),
    },
    button: {
      margin: 0,
      padding: `${theme.spacing(2)}px ${theme.spacing(10)}px`,
    },
    inActive: {
      color: theme.palette.grey[600],
      fill: theme.palette.grey[600],
    },
    active: {
      color: theme.palette.warning.dark,
      fill: theme.palette.warning.dark,
    },
  })
);

interface Props {
  sortType: string;
  setSortType: Dispatch<SetStateAction<string>>;
}

const PostFilterBar: React.FC<Props> = ({ sortType, setSortType }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Grid container justify={'space-evenly'} alignItems={'center'}>
        <Grid item>
          <Button
            className={classes.button}
            startIcon={
              <Whatshot
                className={
                  sortType == 'hot' ? classes.active : classes.inActive
                }
              />
            }
            onClick={() => setSortType('hot')}
          >
            <div
              className={sortType == 'hot' ? classes.active : classes.inActive}
            >
              Hot
            </div>
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            startIcon={
              <AcUnit
                className={
                  sortType == 'new' ? classes.active : classes.inActive
                }
              />
            }
            onClick={() => setSortType('new')}
          >
            <div
              className={sortType == 'new' ? classes.active : classes.inActive}
            >
              New
            </div>
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            startIcon={
              <Whatshot
                className={
                  sortType == 'top' ? classes.active : classes.inActive
                }
              />
            }
            onClick={() => setSortType('top')}
          >
            <div
              className={sortType == 'top' ? classes.active : classes.inActive}
            >
              Top
            </div>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PostFilterBar;
