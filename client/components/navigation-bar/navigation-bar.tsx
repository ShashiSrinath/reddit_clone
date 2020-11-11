import {
  AppBar,
  Button,
  createStyles,
  Grid,
  InputAdornment,
  TextField,
  Theme,
  Toolbar,
} from '@material-ui/core';
import Image from 'next/image';
import { makeStyles } from '@material-ui/styles';
import { Search } from '@material-ui/icons';
import Link from 'next/link';
import { useContext } from 'react';
import ProfileInfo from './profile-info';
import { GlobalContext } from '../../context/global-state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'white',
      marginBottom: theme.spacing(3),
      minHeight: 50,
    },
    logo: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingTop: 0,
      paddingBottom: 0,
    },
    searchRoot: {
      width: '100%',
      '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.light,
      },
      '& input': {
        padding: theme.spacing(1),
      },
    },
  })
);

const NavigationBar: React.FC = () => {
  const classes = useStyles();
  const {
    auth: { state: authState },
  } = useContext(GlobalContext);

  const LoggedOutContent = () => (
    <Grid md={2} container justify={'flex-end'} spacing={2}>
      <Grid item>
        <Link href={'/login'}>
          <Button variant={'outlined'} color={'primary'}>
            Login
          </Button>
        </Link>
      </Grid>
      <Grid item>
        <Link href={'/signup'}>
          <Button variant={'contained'} color={'primary'}>
            Sign Up
          </Button>
        </Link>
      </Grid>
    </Grid>
  );

  return (
    <AppBar position={'sticky'} className={classes.root}>
      <Toolbar>
        <Grid container alignItems={'center'} justify={'space-between'}>
          <Grid item sm={4} md={3}>
            <Link href={'/'}>
              <a className={classes.logo}>
                <Image src={'/logo.svg'} width={100} height={50} />
              </a>
            </Link>
          </Grid>
          <Grid item sm={6} md={4}>
            <TextField
              variant={'outlined'}
              className={classes.searchRoot}
              placeholder={'Search...'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item sm={2} md={3} />
          {authState.isLoggedIn ? (
            <ProfileInfo authState={authState} />
          ) : (
            <LoggedOutContent />
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
