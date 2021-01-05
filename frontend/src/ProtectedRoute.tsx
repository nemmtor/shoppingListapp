import React, { useEffect, useState } from 'react';
import { Redirect, RouteProps, Route } from 'react-router-dom';
import { Page } from './components';
import { checkAuthentication } from './utils';

interface IProps extends RouteProps {
  Component: React.FC;
  title: string;
}

export const ProtectedRoute: React.FC<IProps> = ({
  Component,
  exact,
  path,
  title,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const isAuthed = await checkAuthentication();
      setIsAuthenticated(isAuthed);
      setIsFetching(false);
    };
    fetchData();
  }, []);

  if (isFetching) return null;

  return (
    <Route exact={exact} path={path}>
      {isAuthenticated && <Page Component={Component} title={title} />}
      {!isFetching && !isAuthenticated && (
        <Redirect
          push
          to={{
            pathname: `/login`,
            search: `redirect=${path}`,
          }}
        />
      )}
    </Route>
  );
};
