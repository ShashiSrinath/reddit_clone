import SignUpForm from '../../components/auth/SignUpForm';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/global-state';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { ServerApiRequest } from '../../lib/api-request';
import redirect from '../../lib/redirect';

const SignUpPage = () => {
  const {
    auth: { state },
  } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    if (state.isLoggedIn) {
      router.push(`/u/${state.username}`);
    }
  }, [state]);

  return (
    <>
      <Head>
        <title>Sign Up - 9Rush</title>
      </Head>
      <SignUpForm />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const jwt = parseCookies(context).jwt;
  if (jwt) {
    const res = await ServerApiRequest(context).get('/users/profile');
    redirect(context, `/u/${res.data.username}`);
  }

  return {
    props: {},
  };
};

export default SignUpPage;
