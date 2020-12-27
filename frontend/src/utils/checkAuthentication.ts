export const checkAuthentication = async (): Promise<boolean> => {
  const token = localStorage.getItem('authToken');
  if (!token) return false;

  const res = await fetch('http://localhost:4000/user/me', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
  return res.json();
};
