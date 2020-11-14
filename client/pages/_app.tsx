import React, { useEffect, useReducer, useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import '../theme/styles/globals.css';
import theme from '../theme/theme';
import NavigationBar from '../components/navigation-bar/navigation-bar';
import GlobalState from '../context/global-state';
import { parseCookies } from 'nookies';
import { ServerApiRequest } from '../lib/api-request';
import {
  AuthAction,
  authReducer,
  AuthState,
} from '../context/reducers/auth-reducer';

interface Props {
  pageProps: any;
  Component: any;
  jwt?: string;
  user?: {
    id: number;
    username: string;
    karma: number;
  };
  apiPath: string;
}

function App(props) {
  const { Component, pageProps } = props;
  const [authState, authDispatch] = useReducer(
    authReducer,
    props.jwt
      ? {
          isLoggedIn: true,
          token: props.jwt,
          ...props.user,
        }
      : { isLoggedIn: false }
  );

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />

        <GlobalState
          auth={{ state: authState, dispatch: authDispatch }}
          apiPath={props.apiPath}
        >
          <NavigationBar />
          <Component {...pageProps} />
        </GlobalState>
      </ThemeProvider>
    </React.Fragment>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  let user;
  let apiPath = process.env.CLIENT_API_PATH
    ? process.env.CLIENT_API_PATH
    : `${ctx.req.headers['x-forwarded-proto']}://${ctx.req.headers.host}/api`;

  if (Component?.getInitialProps) {
    pageProps = await Component.getInitialProps();
  }

  const jwt = parseCookies(ctx).jwt;
  //fetch user profile if jwt exists
  if (jwt) {
    const res = await ServerApiRequest(ctx).get('/users/profile');
    user = res.data;
  }

  return {
    pageProps,
    jwt,
    user,
    apiPath,
  };
};

export default App;
