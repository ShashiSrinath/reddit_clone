import React, { useContext, useEffect, useState } from 'react';
import AuthLayout from './auth-layout';
import {
  Button,
  createStyles,
  Grid,
  Snackbar,
  TextField,
  Theme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';
import axios from 'axios';
import { GlobalContext } from '../../context/global-state';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    textField: {
      '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.light,
      },
      '& input': {
        padding: theme.spacing(2),
      },
      '& label': {
        fontSize: '1em',
      },
    },
    signUpContentWrapper: {
      marginTop: theme.spacing(4),
    },
    signUpField: {
      color: theme.palette.primary.dark,
      fontWeight: 'bold',
    },
  })
);

const LoginForm: React.FC = () => {
  const classes = useStyles();
  const {
    apiPath,
    auth: { dispatch },
  } = useContext(GlobalContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(undefined);

  const [snackOpen, setSnackOpen] = React.useState(false);

  const handleLogin = async () => {
    try {
      setError(undefined);
      const res = await axios.post(`${apiPath}/auth/login`, {
        username,
        password,
      });

      dispatch({
        type: 'login',
        payload: {
          token: res.data.access_token,
          karma: res.data.karma,
          userId: res.data.id,
          username: res.data.username,
        },
      });

      setSnackOpen(true);
    } catch (e) {
      if (e.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('Server error. please try again later');
      }
    }
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  return (
    <AuthLayout title={'Login'}>
      <Grid
        container
        direction={'column'}
        className={classes.root}
        alignItems={'center'}
        spacing={3}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            handleLogin();
          }
        }}
      >
        {error && (
          <Grid item xs={12} sm={10} md={8} lg={8} className={classes.root}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
        {/* show on successful login*/}
        <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            User logged in
          </Alert>
        </Snackbar>
        <Grid item xs={12} sm={10} md={8} lg={8} className={classes.root}>
          <TextField
            label={'USERNAME'}
            variant={'outlined'}
            className={classes.textField}
            fullWidth={true}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={10} md={8} lg={8} className={classes.root}>
          <TextField
            label={'PASSWORD'}
            type={'password'}
            variant={'outlined'}
            className={classes.textField}
            fullWidth={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={10} md={8} lg={8} className={classes.root}>
          <Button
            variant={'contained'}
            color={'primary'}
            fullWidth
            onClick={handleLogin}
          >
            Log In
          </Button>
        </Grid>
        <Grid item xs={12} sm={10} md={8} lg={8} className={classes.root}>
          <span>New to 9 Rush? </span>
          <Link href={'/signup'}>
            <a className={classes.signUpField}>Sign Up</a>
          </Link>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};

export default LoginForm;
