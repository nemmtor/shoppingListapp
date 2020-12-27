import React from 'react';
import { RouteProps, useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';

import LoginForm from './LoginForm';
import styles from './LoginPage.module.scss';
import { IFormValues } from './IFormValues';
import { ILoginResJson } from '../../../../shared/ILoginResJson';

const LoginPage: React.FC<RouteProps> = () => {
  const location = useLocation();
  const history = useHistory();

  const handleSubmit = async (values: IFormValues): Promise<void> => {
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
    if (res.status < 400) {
      const { token } = json;
      localStorage.setItem('authToken', token as string);

      const { redirect } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      if (redirect) {
        history.push(redirect as string);
      } else {
        history.push('/');
      }
    } else {
      console.log(json.message);
    }
  };

  return (
    <div className={styles.container}>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};
export default LoginPage;
