import { useState } from 'react';
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
import { TimelinePost as TimeLinePostType } from '@bit/shashisrinath.9rush-types.postinterface';
import { convertToKValue } from '../../util/convertToKValue';
import { useApiRequest } from '../../lib/api-request';
import { parseTimeSince } from '../../util/parse-time-since';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      display: 'flex',
      padding: theme.spacing(2),

      '& a::last-child::before': {
        color: 'blue',
        content: ' ',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 2,
      },

      '& p': {
        margin: 0,
      },
      '&:hover': {
        boxShadow:
          '0px 2px 2px -1px rgba(0,0,0,0.2), 0px 1px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
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
      maxHeight: theme.spacing(40),
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
      marginTop: 0,
      marginBottom: theme.spacing(1),
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
  const classes = useStyles();
  const axios = useApiRequest();

  const handleUpVoteClick = async () => {
    try {
      const res = await axios.put('/posts/add-vote', {
        postId: post.id,
        vote: post.currentUserVoteType === 1 ? 0 : 1,
      });
      setPost({ ...post, voteCount: res.data.count });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDownVoteClick = async () => {
    try {
      const res = await axios.put('/posts/add-vote', {
        postId: post.id,
        vote: post.currentUserVoteType === -1 ? 0 : -1,
      });
      setPost({ ...post, voteCount: res.data.count });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Paper>
      <Link href={`/g/${post.group.name}/posts/${post.id}`}>
        <a>
          <div className={classes.root}>
            <div className={classes.voteColumn}>
              <IconButton onClick={handleUpVoteClick}>
                <KeyboardArrowUp
                  className={
                    post.currentUserVoteType == 1
                      ? classes.voteArrowUpVoteActive
                      : classes.voteArrowUpVote
                  }
                />
              </IconButton>

              <div className={classes.voteCount}>
                {convertToKValue(post.voteCount)}
              </div>
              <IconButton onClick={handleDownVoteClick}>
                <KeyboardArrowDown
                  className={
                    post.currentUserVoteType == -1
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
                  <div className={classes.postedTime}>
                    {parseTimeSince(post.createdDate)}
                  </div>
                </Grid>
              </Grid>
              <div className={classes.postContentWrapper}>
                <h3 className={classes.postTitle}>{post.title}</h3>
                <p>{post.content}</p>
              </div>
              <div className={classes.bottomRow}>
                <Button
                  startIcon={<Comment />}
                  className={classes.bottomRowButton}
                >
                  {post.commentCount} Comments
                </Button>
                <Button
                  startIcon={<Share />}
                  className={classes.bottomRowButton}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </Paper>
  );
};

export default TimelinePost;
