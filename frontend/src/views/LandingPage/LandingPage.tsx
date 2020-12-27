import React from 'react';
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import styles from './LandingPage.module.scss';

const LandingPage: React.FC = () => {
  return (
    <div className={`${styles.hero}`}>
      <h1>Welcome to shopping list app</h1>
      <Button
        color="primary"
        variant="contained"
        component={RouterLink}
        to="/login"
      >
        Login
      </Button>
    </div>
  );
};

export default LandingPage;
