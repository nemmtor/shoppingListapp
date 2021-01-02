import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './RegisterPage.module.scss';
import { AuthForm } from '../../components';
import { IAuthResJson, IFormError } from '../../../../shared';
import { IAuthFormValues } from '../../interfaces';

export const RegisterPage: React.FC = () => {
  const history = useHistory();

  const handleSubmit = async (
    values: IAuthFormValues,
  ): Promise<void | IFormError[]> => {
    const { username, password } = values;
    const body = JSON.stringify({ username, password });
    const res = await fetch('http://localhost:4000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const json: IAuthResJson = await res.json();

    // If success
    if (res.status < 400) {
      return history.push('/login');
    }
    return json.errors;
  };

  return (
    <div className={styles.container}>
      <AuthForm handleSubmit={handleSubmit} formType="register" />
    </div>
  );
};
