import React from 'react';

import LoginForm from './LoginForm';
import styles from './LoginPage.module.scss';
import { IFormValues } from './IFormValues';
import { ILoginResJson } from '../../../../shared/ILoginResJson';

const LoginPage: React.FC = () => {
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
      console.log(json.token);
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
