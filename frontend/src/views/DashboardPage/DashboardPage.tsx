import React from 'react';
import { Typography } from '@material-ui/core';

import { Dashboard } from '../../components';

export const DashboardPage: React.FC = (): JSX.Element => {
  const username = localStorage.getItem('currentUserUsername');
  return (
    <Dashboard>
      <Typography>
        Hi there, <span style={{ fontWeight: 700 }}>{username}</span>. Here is
        your shopping list dashboard. Enjoy!
      </Typography>
    </Dashboard>
  );
};
