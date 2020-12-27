import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import { LandingPage, LoginPage } from './views';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardPage } from './views/DashboardPage';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <ProtectedRoute exact path="/dashboard" Component={DashboardPage} />
      </Switch>
    </>
  );
};
export default App;
