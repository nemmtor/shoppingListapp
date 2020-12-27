import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import { LandingPage, LoginPage } from './views';

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
      </Switch>
    </>
  );
};
export default App;
