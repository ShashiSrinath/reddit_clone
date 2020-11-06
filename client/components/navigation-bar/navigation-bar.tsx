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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'white',
      marginBottom: theme.spacing(3),
    },
    searchRoot: {
      width: '100%',
      '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.light,
      },
      '& input': {
        padding: theme.spacing(1.6),
      },
    },
  })
);

const NavigationBar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position={'sticky'} className={classes.root}>
      <Toolbar>
        <Grid container alignItems={'center'}>
          <Grid item sm={4} md={3}>
            <Button>
              <Image src={'/logo.svg'} width={200} height={50} />
            </Button>
          </Grid>
          <Grid item sm={2} md={1} />
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
          <Grid item sm={2} md={1} />
          <Grid container md={3} justify={'flex-end'} spacing={2}>
            <Grid item>
              <Button variant={'outlined'} color={'primary'}>
                Login
              </Button>
            </Grid>
            <Grid item>
              <Button variant={'contained'} color={'primary'}>
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
