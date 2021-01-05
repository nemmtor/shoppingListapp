import React from 'react';
import { RouteProps, useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';

import { AuthForm, PaperCenter } from '../../components';
import { IAuthFormValues } from '../../interfaces';
import { IFormError, IAuthResJson } from '../../../../shared';

const LoginPage: React.FC<RouteProps> = () => {
  const location = useLocation();
  const history = useHistory();

  const handleSubmit = async (
    values: IAuthFormValues,
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

    const json: IAuthResJson = await res.json();

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
      // Redirect to dashboard
      return history.push('/dashboard');
    }

    return json.errors;
  };

  return (
    <>
      <div className="fullscreenCenterBg">
        <PaperCenter elevation={10}>
          <AuthForm handleSubmit={handleSubmit} formType="login" />
        </PaperCenter>
      </div>
    </>
  );
};
export default LoginPage;
