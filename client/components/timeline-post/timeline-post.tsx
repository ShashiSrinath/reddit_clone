import { useContext, useState } from 'react';
import {
  Avatar,
  Button,
  createStyles,
  Grid,
  IconButton,
  Paper,
  Theme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {
  Comment,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Share,
} from '@material-ui/icons';
import Link from 'next/link';
import { TimelinePost as TimeLinePostType } from '../../../api/src/post/post.interface';
import { convertToKValue } from '../../util/convertToKValue';
import axios from 'axios';
import { ApiContext } from '../../context/global-context';

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
    voteArrow: {
      fill: '#00000050',
    },
    voteArrowUpVote: {
      '&:hover': {
        fill: '#e53935',
      },
    },
    voteArrowUpVoteActive: {
      fill: '#e53935',
    },
    voteArrowDownVote: {
      '&:hover': {
        fill: '#1e88e5',
      },
    },
    voteArrowDownVoteActive: {
      fill: '#1e88e5',
    },
    voteCount: {
      fontWeight: 'bold',
    },
    groupAvatar: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.getContrastText(theme.palette.primary.main),
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    groupName: {
      marginLeft: theme.spacing(-2),
      fontWeight: 'bold',

      '&:hover': {
        textDecoration: 'underline',
      },
    },
    postedUserWrapper: {
      color: theme.palette.grey['600'],
      fontSize: '0.9em',
    },
    postedUserName: {
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    postedTime: {
      marginLeft: theme.spacing(-2),
      color: theme.palette.grey['600'],
      fontSize: '0.9em',
    },
    postContentWrapper: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(2),
      minHeight: theme.spacing(20),
      maxHeight: theme.spacing(25),
      position: 'relative',
      overflow: 'hidden',
      '&::after': {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        content: '""',
        backgroundImage: 'linear-gradient(#ffffffaa, #fff)',
        height: '20px',
        boxShadow: '0 -15px 30px #fff',
      },
    },
    postTitle: {
      fontSize: '1.5em',
    },
    bottomRow: {
      display: 'flex',
      backgroundColor: theme.palette.background.paper,
      height: theme.spacing(5),
      width: '100%',
    },
    bottomRowButton: {
      color: theme.palette.grey['600'],
    },
  })
);

interface Props {
  post: TimeLinePostType;
}

const TimelinePost: React.FC<Props> = ({ post: postOrigin }) => {
  const [post, setPost] = useState<TimeLinePostType>(postOrigin);
  const apiPath = useContext(ApiContext);
  const classes = useStyles();

  console.log(apiPath);

  const handleUpVoteClick = async () => {
    try {
      const res = await axios.put(`${apiPath}/posts/add-vote`, {
        postId: post.id,
        vote: post.votes.userVoteType === 1 ? 0 : 1,
      });
      setPost({ ...post, votes: res.data });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDownVoteClick = async () => {};

  return (
    <Paper>
      <div className={classes.root}>
        <div className={classes.voteColumn}>
          <IconButton onClick={handleUpVoteClick}>
            <KeyboardArrowUp
              className={
                post.votes.userVoteType == 1
                  ? classes.voteArrowUpVoteActive
                  : classes.voteArrowUpVote
              }
            />
          </IconButton>

          <div className={classes.voteCount}>
            {convertToKValue(post.votes.count)}
          </div>
          <IconButton onClick={handleDownVoteClick}>
            <KeyboardArrowDown
              className={
                post.votes.userVoteType == -1
                  ? classes.voteArrowDownVoteActive
                  : classes.voteArrowDownVote
              }
            />
          </IconButton>
        </div>
        <div>
          <Grid container spacing={3} alignItems={'center'}>
            <Grid item>
              <Avatar className={classes.groupAvatar}>SS</Avatar>
            </Grid>
            <Grid item>
              <div className={classes.groupName}>
                <Link href={'g/node'}>
                  <a>g/{post.group.name}</a>
                </Link>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.postedUserWrapper}>
                Posted By{' '}
                <span>
                  <Link href={'u/madara'}>
                    <a className={classes.postedUserName}>
                      u/{post.user.username}
                    </a>
                  </Link>
                </span>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.postedTime}>9 hours ago</div>
            </Grid>
          </Grid>
          <div className={classes.postContentWrapper}>
            <div>
              <h3 className={classes.postTitle}>{post.title}</h3>
            </div>
            <p>{post.content}</p>
          </div>
          <div className={classes.bottomRow}>
            <Button startIcon={<Comment />} className={classes.bottomRowButton}>
              {post.comments} Comments
            </Button>
            <Button startIcon={<Share />} className={classes.bottomRowButton}>
              Share
            </Button>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default TimelinePost;
