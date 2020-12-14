type SqlErrorReturnValue = string | null;

export const parseSqlError = (code: string): SqlErrorReturnValue => {
  if (!code) {
    return null;
  }
  switch (code) {
    case '23505':
      return 'That username is already taken.';
    default:
      return 'Something went wrong in database.';
  }
};
