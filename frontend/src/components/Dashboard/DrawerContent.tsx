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
} from '@material-ui/core';
import {
  ExitToApp as LogoutIcon,
  AddShoppingCart as AddCartIcon,
  ViewList as YourListsIcon,
  Public as PublicIcon,
  AccountCircle as AccountIcon,
} from '@material-ui/icons';

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
    text: 'Your lists',
    Icon: YourListsIcon,
  },
  {
    text: 'Add new',
    Icon: AddCartIcon,
  },
  {
    text: 'Public ones',
    Icon: PublicIcon,
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
        {drawerItems.map(({ text, Icon }) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
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
