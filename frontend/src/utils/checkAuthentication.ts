import { API_URL } from '../config';
import { createBearerToken } from './createBearerToken';

export const checkAuthentication = async (): Promise<boolean> => {
  const token = localStorage.getItem('authToken');
  if (!token) return false;

  const bearer = createBearerToken(token as string);

  const res = await fetch(`${API_URL}/user/me`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: bearer },
  });
  if (res.status >= 400) {
    return false;
  }
  return true;
};
