import Head from 'next/head';
import TimelinePost from '../components/timeline-post/timeline-post';
import { createStyles, Grid, Theme } from '@material-ui/core';
import { ServerApiRequest, useApiRequest } from '../lib/api-request';
import PostFilterBar from '../components/post-filter-bar/post-filter-bar';
import { useEffect, useState } from 'react';
import { TimelinePost as TimeLinePostType } from '@bit/shashisrinath.9rush-types.postinterface';
import TimelinePostSkeleton from '../components/timeline-post/timeline-post-skeleton';
import PageInfoLayout from '../components/page-info/page-info-layout';
import { makeStyles } from '@material-ui/styles';
import RecentPosts from '../components/recent-posts/recent-posts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100vw',
      minHeight: '100vh',
    },
  })
);

export default function Home(props) {
  const classes = useStyles();
  const [firstUpdate, setFirstUpdate] = useState(true);
  const [posts, setPosts] = useState<TimeLinePostType[]>(props.data);
  const [sortType, setSortType] = useState('hot');
  const [isLoading, setLoading] = useState(false);
  const axios = useApiRequest();

  const updatePosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/posts?page=1&sortBy=${sortType}`);
      setPosts(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      //todo: remove manually added timeout
      setTimeout(() => setLoading(false), 1000);
    }
  };

  //fetch new posts on sort type change
  useEffect(() => {
    if (firstUpdate) {
      setFirstUpdate(false);
    } else {
      updatePosts();
    }
  }, [sortType]);

  return (
    <Grid container justify={'center'}>
      <Head>
        <title>9Rush</title>
      </Head>
      <Grid item sm={11} md={11} lg={10} spacing={1} justify={'center'}>
        <Grid container spacing={2} justify={'space-around'}>
          <Grid item sm={12} md={8} lg={8}>
            <Grid container spacing={4} alignItems={'flex-start'}>
              <Grid item sm={12}>
                <PostFilterBar sortType={sortType} setSortType={setSortType} />
              </Grid>
              {isLoading ? (
                <>
                  <Grid item sm={12}>
                    <TimelinePostSkeleton />
                  </Grid>
                  <Grid item sm={12}>
                    <TimelinePostSkeleton />
                  </Grid>
                  <Grid item sm={12}>
                    <TimelinePostSkeleton />
                  </Grid>
                  <Grid item sm={12}>
                    <TimelinePostSkeleton />
                  </Grid>
                </>
              ) : (
                <>
                  {posts.map((post) => (
                    <Grid item sm={12} key={post.id}>
                      <TimelinePost post={post} />
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <Grid container direction={'column'} spacing={5}>
              <Grid item>
                <PageInfoLayout />
              </Grid>
              <Grid item>
                <RecentPosts />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = async (context) => {
  const res = await ServerApiRequest(context).get('posts?sortBy=hot&page=1');
  return { props: { data: res.data } };
};
