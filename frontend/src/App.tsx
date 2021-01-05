import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CssBaseline, StylesProvider, ThemeProvider } from '@material-ui/core';
import { HelmetProvider } from 'react-helmet-async';

import { LandingPage, LoginPage, RegisterPage } from './views';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardPage } from './views/DashboardPage';
import { theme } from './theme';
import { Page } from './components';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route exact path="/">
              <Page Component={LandingPage} title="Shopping App" />
            </Route>
            <Route path="/login">
              <Page Component={LoginPage} title="Login - Shopping App" />
            </Route>
            <Route path="/register">
              <Page Component={RegisterPage} title="Register - Shopping App" />
            </Route>
            <ProtectedRoute
              exact
              path="/dashboard"
              title="Dashboard - Shopping App"
              Component={DashboardPage}
            />
          </Switch>
        </ThemeProvider>
      </StylesProvider>
    </HelmetProvider>
  );
};
export default App;
