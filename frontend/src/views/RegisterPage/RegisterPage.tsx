import React from 'react';
import { useHistory } from 'react-router-dom';

import { AuthForm, PaperCenter } from '../../components';
import { IAuthResJson, IFormError } from '../../../../shared';
import { IAuthFormValues } from '../../interfaces';
import { saveToLocalStorage } from '../../utils';

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
      const { token, userId, username: usernameFromToken } = json;
      saveToLocalStorage('authToken', token as string);
      saveToLocalStorage('currentUserUsername', usernameFromToken as string);
      saveToLocalStorage('currentUserId', `${userId}`);
      return history.push('/dashboard');
    }
    return json.errors;
  };

  return (
    <div className="fullscreenCenterBg">
      <PaperCenter elevation={10}>
        <AuthForm handleSubmit={handleSubmit} formType="register" />
      </PaperCenter>
    </div>
  );
};
