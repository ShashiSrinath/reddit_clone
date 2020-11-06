import React from 'react';
import { Button, createStyles, Grid, Paper, Theme } from '@material-ui/core';
import Image from 'next/image';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '80vh',
    },
    gridWrapper: {
      height: '100%',
    },
    sideImageWrapper: {
      position: 'relative',
    },
    formContentWrapper: {
      margin: theme.spacing(3),
    },
    policyLink: {
      color: '#03a9f4',
    },
    oAuthWrapper: {
      marginTop: theme.spacing(5),
    },
    formSeparator: {
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(7),
      display: 'flex',
      width: '50%',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: theme.palette.grey['500'],
    },
    formSeparatorLine: {
      borderTop: '3px solid #edeff1',
      width: '40%',
    },
  })
);

interface Props {
  title: string;
}

const AuthLayout: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Grid container justify={'center'}>
      <Grid item xs={12} sm={12} md={10} lg={8}>
        <Paper className={classes.root}>
          <Grid container className={classes.gridWrapper}>
            <Grid item xs={2} sm={4} className={classes.sideImageWrapper}>
              <Image src={'/auth-pattern.jpg'} layout={'fill'} />
            </Grid>
            <Grid item xs={9} sm={7}>
              <div className={classes.formContentWrapper}>
                <Grid container alignItems={'center'} direction={'column'}>
                  <div>
                    <h2>{props.title}</h2>
                  </div>
                  <div>
                    <p>
                      By continuing, you agree to our{' '}
                      <Link href={'/policies/privacy'}>
                        <a className={classes.policyLink}>Privacy Policy</a>
                      </Link>
                      .
                    </p>
                  </div>
                  <div className={classes.oAuthWrapper}>
                    {/*todo : enable google oauth */}
                    <Button
                      variant={'outlined'}
                      color={'primary'}
                      disabled={true}
                    >
                      <Image
                        src={'/btn_google_light_normal_ios.svg'}
                        width={40}
                        height={40}
                      />{' '}
                      Continue With Google
                    </Button>
                  </div>
                  <div className={classes.formSeparator}>
                    <span className={classes.formSeparatorLine} />
                    <span>OR</span>
                    <span className={classes.formSeparatorLine} />
                  </div>
                  {props.children}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
