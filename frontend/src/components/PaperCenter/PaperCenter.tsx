import React from 'react';
import { makeStyles, Theme, Paper, PaperProps } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '30%',
    background: 'rgba(255,255,255,0.85)',
  },
}));

export const PaperCenter: React.FC<PaperProps> = ({ children, elevation }) => {
  const styles = useStyles();
  return (
    <Paper className={styles.paper} elevation={elevation}>
      {children}
    </Paper>
  );
};
