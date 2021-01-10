import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { PaperCenter } from '../../components/PaperCenter';

const LandingPage: React.FC = () => {
  return (
    <div className="fullscreenCenterBg">
      <PaperCenter elevation={10}>
        <Typography variant="h4" component="h1" align="center">
          Shopping List App! v1.0
        </Typography>
        <Box sx={{ marginTop: 2 }}>
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
