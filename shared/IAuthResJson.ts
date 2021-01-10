import { IFormError } from './IFormError';

type TField = 'username' | 'password';

interface IAuthFormError extends IFormError {
  field: TField;
}

export interface IAuthResJson {
  errors?: IAuthFormError[];
  token?: string;
  username?: string;
  userId?: number;
}
