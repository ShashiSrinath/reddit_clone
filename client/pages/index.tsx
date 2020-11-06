import Head from "next/head";
import styles from "../theme/styles/Home.module.css";
import TimelinePost from "../components/timeline-post/timeline-post";
import { Grid } from "@material-ui/core";
import axios from "axios";

export const getServerSideProps = async (context) => {
  const res = await axios.get("http://localhost:4000/posts/group/4");
  return { props: { data: res.data } };
};

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container justify={"center"} spacing={4}>
        {props.data.map((post) => (
          <Grid item sm={12} md={8}>
            <TimelinePost post={post} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
