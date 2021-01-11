import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
  Box,
  Link,
} from '@material-ui/core';
import {
  ExitToApp as LogoutIcon,
  AddShoppingCart as AddCartIcon,
  ViewList as YourListsIcon,
  Public as PublicIcon,
  AccountCircle as AccountIcon,
  Dashboard as DashboardIcon,
} from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: theme.mixins.toolbar,
  userContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  userIcon: {
    fontSize: '4rem',
    opacity: 0.6,
    marginBottom: theme.spacing(1),
  },
  userTitle: {
    fontWeight: 700,
  },
  logout: {
    color: theme.palette.secondary.main,
  },
}));

const drawerItems = [
  {
    text: 'Dashboard',
    Icon: DashboardIcon,
    linkTo: '/dashboard',
  },
  {
    text: 'Add new',
    Icon: AddCartIcon,
    linkTo: '/dashboard/addnew',
  },
  {
    text: 'Your lists',
    Icon: YourListsIcon,
    linkTo: '/dashboard/addnew',
  },
  {
    text: 'Public ones',
    Icon: PublicIcon,
    linkTo: '/dashboard/addnew',
  },
];

interface IProps {
  handleLogout: () => void;
  currentUser: string;
}

export const DrawerContent: React.FC<IProps> = ({
  handleLogout,
  currentUser,
}) => {
  const styles = useStyles();

  return (
    <div>
      <div className={styles.toolbar} />
      <Divider />
      <Box className={styles.userContainer}>
        <AccountIcon className={styles.userIcon} />
        <Typography className={styles.userTitle}>{currentUser}</Typography>
      </Box>
      <Divider />
      <List>
        {drawerItems.map(({ text, Icon, linkTo }) => (
          <Link
            to={linkTo}
            component={RouterLink}
            underline="none"
            color="inherit"
            key={text}
          >
            <ListItem button>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon className={styles.logout}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" className={styles.logout} />
        </ListItem>
      </List>
    </div>
  );
};
