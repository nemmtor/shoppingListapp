import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import styles from './LandingPage.module.scss';

const LandingPage: React.FC = () => {
  return (
    <div className={`${styles.hero}`}>
      <Typography variant="h4" component="h1" align="center">
        Welcome to shopping list app
      </Typography>
      <Box mt={2}>
        <Button
          color="primary"
          variant="contained"
          component={RouterLink}
          to="/login"
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default LandingPage;
