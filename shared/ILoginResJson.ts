import { IFormError } from './IFormError';

type TField = 'username' | 'password';

interface ILoginFormError extends IFormError {
  field: TField;
}

export interface ILoginResJson {
  errors?: ILoginFormError[];
  token?: string;
}
