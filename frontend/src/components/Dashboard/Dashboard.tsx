import React, { useState } from 'react';
import {
  AppBar,
  makeStyles,
  Theme,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Hidden,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Menu as MenuIcon } from '@material-ui/icons';

import { DrawerContent } from './DrawerContent';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    position: 'relative',
  },
}));

export const Dashboard: React.FC = ({ children }) => {
  const styles = useStyles();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const history = useHistory();

  const currentUser = localStorage.getItem('currentUserUsername');

  const handleDrawerToggle = (): void => {
    setIsMobileOpen((prevState) => !prevState);
  };

  const handleLogout = (): void => {
    localStorage.removeItem('authToken');
    history.push('/login');
  };

  return (
    <div className={styles.wrapper}>
      <AppBar position="fixed">
        <Toolbar className={styles.appBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Shopping list app
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={styles.drawer} aria-label="mailbox folders">
        <Hidden smUp>
          <Drawer
            variant="temporary"
            open={isMobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: styles.drawerPaper,
            }}
          >
            <DrawerContent
              handleLogout={handleLogout}
              currentUser={currentUser as string}
            />
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            classes={{
              paper: styles.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <DrawerContent
              handleLogout={handleLogout}
              currentUser={currentUser as string}
            />
          </Drawer>
        </Hidden>
      </nav>
      <main className={styles.content}>
        <div className={styles.toolbar} />
        {children}
      </main>
    </div>
  );
};
