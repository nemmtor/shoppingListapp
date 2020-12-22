type SqlErrorReturnValue = string | null;

// TODO: this should take whole error, and parse error message itself rather than just telling that username is already taken
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
