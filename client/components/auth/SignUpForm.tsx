import React, { useContext, useState } from 'react';
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
import { useApiRequest } from '../../lib/api-request';
import { useFormInput } from '../../hooks/use-form-input';
import * as yup from 'yup';
import { setCookie } from 'nookies';
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
        fontSize: '.8em',
      },
    },
    signUpContentWrapper: {
      marginTop: theme.spacing(4),
    },
    loginField: {
      color: theme.palette.primary.dark,
      fontWeight: 'bold',
    },
  })
);

const SignUpForm: React.FC = () => {
  const {
    auth: { dispatch },
  } = useContext(GlobalContext);
  const classes = useStyles();
  const axios = useApiRequest();

  const email = useFormInput({
    validationSchema: yup.string().email().required(),
  });
  const username = useFormInput({
    validationSchema: yup.string().min(3).max(30).required(),
  });
  const [isValidUsername, setValidUsername] = useState(false);
  const password = useFormInput({
    validationSchema: yup.string().min(4).max(30).required(),
  });
  const password2 = useFormInput({
    validation: (value: string) => {
      if (value == password.value) return true;
      else {
        throw new Error('Passwords do not match');
      }
    },
  });

  const [error, setError] = useState(undefined);
  const [snackOpen, setSnackOpen] = React.useState(false);

  const checkUserNameAvailability = async () => {
    try {
      if (await username.validate()) {
        const res = await axios.post('/users/check-username', {
          username: username.value,
        });
        username.setErrors(undefined);
        setValidUsername(true);
      }
    } catch (e) {
      username.setErrors(e.response.data.message);
      setValidUsername(false);
    }
  };

  const handleSignUp = async () => {
    //check validations
    if (
      isValidUsername &&
      !email.errors &&
      !username.errors &&
      !password.errors &&
      !password2.errors
    ) {
      try {
        setError(undefined);
        const res = await axios.post('/users/register', {
          email: email.value,
          username: username.value,
          password: password.value,
          password2: password2.value,
        });
        setSnackOpen(true);

        dispatch({
          type: 'login',
          payload: {
            token: res.data.access_token,
            karma: res.data.karma,
            userId: res.data.id,
            username: res.data.username,
          },
        });
      } catch (e) {
        if (e.response) {
          setError(e.response.message);
        } else {
          setError(e.message);
        }
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
    <AuthLayout title={'Sign Up'}>
      <Grid
        container
        direction={'column'}
        className={classes.root}
        alignItems={'center'}
        spacing={3}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            handleSignUp();
          }
        }}
      >
        {error && (
          <Grid item xs={12} sm={10} md={8} lg={8} className={classes.root}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}

        {/* show on sign in*/}
        <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            User Signed Up
          </Alert>
        </Snackbar>
        <Grid item xs={12} sm={10} md={8} lg={8} className={classes.root}>
          <TextField
            error={!!email.errors}
            helperText={email.errors}
            inputMode={'email'}
            label={'EMAIL'}
            variant={'outlined'}
            className={classes.textField}
            fullWidth={true}
            value={email.value}
            onChange={email.onChange}
            onBlur={email.validate}
          />
        </Grid>
        <Grid item xs={12} sm={10} md={8} lg={8} className={classes.root}>
          <TextField
            error={!!username.errors}
            helperText={username.errors}
            label={'USERNAME'}
            variant={'outlined'}
            className={classes.textField}
            fullWidth={true}
            value={username.value}
            onChange={(e) => username.setValue(e.target.value)}
            onBlur={checkUserNameAvailability}
          />
        </Grid>
        <Grid item xs={12} sm={10} md={8} lg={8} className={classes.root}>
          <TextField
            error={!!password.errors}
            helperText={password.errors}
            label={'PASSWORD'}
            type={'password'}
            variant={'outlined'}
            className={classes.textField}
            fullWidth={true}
            value={password.value}
            onChange={password.onChange}
            onBlur={password.validate}
          />
        </Grid>
        <Grid item xs={12} sm={10} md={8} lg={8} className={classes.root}>
          <TextField
            error={!!password2.errors}
            helperText={password2.errors}
            label={'Confirm PASSWORD'}
            type={'password'}
            variant={'outlined'}
            className={classes.textField}
            fullWidth={true}
            value={password2.value}
            onChange={password2.onChange}
            onBlur={password2.validate}
          />
        </Grid>
        <Grid item xs={12} sm={10} md={8} lg={8} className={classes.root}>
          <Button
            variant={'contained'}
            color={'primary'}
            fullWidth
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Grid>
        <Grid item xs={12} sm={10} md={8} lg={8} className={classes.root}>
          <span>Already a user? </span>
          <Link href={'/login'}>
            <a className={classes.loginField}>Log In</a>
          </Link>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};

export default SignUpForm;
