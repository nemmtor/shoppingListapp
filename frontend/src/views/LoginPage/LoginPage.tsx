import React from 'react';
import { RouteProps, useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';

import LoginForm from './LoginForm';
import styles from './LoginPage.module.scss';
import { IFormValues } from './IFormValues';
import { IFormError, ILoginResJson } from '../../../../shared';

const LoginPage: React.FC<RouteProps> = () => {
  const location = useLocation();
  const history = useHistory();

  const handleSubmit = async (
    values: IFormValues,
  ): Promise<void | IFormError[]> => {
    const { username, password } = values;
    const body = JSON.stringify({ username, password });
    const res = await fetch('http://localhost:4000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const json: ILoginResJson = await res.json();

    // If success
    if (res.status < 400) {
      const { token } = json;
      localStorage.setItem('authToken', token as string);

      const { redirect } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      // If there is a redirect query stringm than redirect to that url
      if (redirect) {
        return history.push(redirect as string);
      }
      // Redirect to root
      return history.push('/');
    }

    return json.errors;
  };

  return (
    <div className={styles.container}>
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
};
export default LoginPage;
