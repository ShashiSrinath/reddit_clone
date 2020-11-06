import React, { useContext, useState } from 'react';
import AuthLayout from './auth-layout';
import {
  Button,
  createStyles,
  Grid,
  TextField,
  Theme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';
import axios from 'axios';
import { ApiContext } from '../../context/global-context';

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
  const { apiPath } = useContext(ApiContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await axios.post(`${apiPath}/auth/login`, {
      username,
      password,
    });
    console.log(res);
  };

  return (
    <AuthLayout title={'Login'}>
      <Grid
        container
        direction={'column'}
        className={classes.root}
        alignItems={'center'}
        spacing={3}
      >
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
