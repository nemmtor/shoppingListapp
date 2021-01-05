import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { PaperCenter } from '../../components/PaperCenter';

const LandingPage: React.FC = () => {
  return (
    <div className="fullscreenCenterBg">
      <PaperCenter elevation={10}>
        <Typography variant="h4" component="h1" align="center">
          Welcome to shopping list app
        </Typography>
        <Box sx={{ marginTop: 4 }}>
          <Button
            color="primary"
            variant="contained"
            component={RouterLink}
            to="/login"
          >
            Login
          </Button>
        </Box>
      </PaperCenter>
    </div>
  );
};

export default LandingPage;
