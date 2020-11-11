import React, { useContext, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Button,
  ClickAwayListener,
  createStyles,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Theme,
} from '@material-ui/core';
import { GlobalContext } from '../../context/global-state';
import {
  AccountBox,
  ExitToApp,
  ExpandMore,
  FilterVintage,
} from '@material-ui/icons';
import Link from 'next/link';
import {
  AuthState,
  AuthStateLoggedIn,
} from '../../context/reducers/auth-reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: '1px solid #88888830',
      minWidth: theme.spacing(30),
      textTransform: 'none',
      position: 'relative',
      alignSelf: 'flex-end',
    },
    relative: {
      position: 'relative',
    },
    karmaIcon: {
      width: '10px',
      height: '10px',
      fill: theme.palette.primary.light,
      marginRight: theme.spacing(1),
    },
    karmaSpan: {
      fontSize: '.6em',
      color: theme.palette.grey['600'],
    },
    expandIcon: {
      fill: theme.palette.grey['700'],
    },
    dropDownMenu: {
      minWidth: theme.spacing(30),
    },
    menuItem: {
      color: theme.palette.grey['700'],
      display: 'flex',
      alignItems: 'center',
    },
    menuItemIcon: {
      marginRight: theme.spacing(3),
    },
  })
);

interface Props {
  authState: AuthStateLoggedIn;
}

const ProfileInfo: React.FC<Props> = ({ authState }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        className={classes.root}
        onClick={handleToggle}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
      >
        <Grid container alignItems={'center'} spacing={1}>
          <Grid item xs={4} className={classes.relative}>
            <Avatar variant={'rounded'} />
          </Grid>
          <Grid item xs={6} className={classes.relative}>
            <Grid container direction={'column'} alignItems={'flex-start'}>
              <Grid item>{authState.username}</Grid>
              <Grid item>
                <Grid container alignItems={'center'}>
                  <Grid item>
                    <FilterVintage className={classes.karmaIcon} />
                  </Grid>
                  <Grid item>
                    <div className={classes.karmaSpan}>
                      {authState.karma} Karma
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <ExpandMore className={classes.expandIcon} />
          </Grid>
        </Grid>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper className={classes.dropDownMenu}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>
                    <Link href={`/u/${authState.username}`}>
                      <a>
                        <div className={classes.menuItem}>
                          <AccountBox className={classes.menuItemIcon} />
                          <div>Profile</div>
                        </div>
                      </a>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link href={'/logout'}>
                      <a>
                        {' '}
                        <div className={classes.menuItem}>
                          <ExitToApp className={classes.menuItemIcon} />
                          <div>Logout</div>
                        </div>
                      </a>
                    </Link>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default ProfileInfo;
