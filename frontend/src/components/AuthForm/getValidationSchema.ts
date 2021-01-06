import * as Yup from 'yup';
import { sharedConstrains } from '../../../../shared';

type TFormType = 'register' | 'login';

const { username, password } = sharedConstrains;

export const getValidationSchema = (formType: TFormType): unknown => {
  const loginShape = {
    username: Yup.string()
      .required('This field is required')
      .min(username.min, 'This username is too short')
      .max(username.max, 'This username is too long'),
    password: Yup.string()
      .required('This field is required')
      .min(password.min, 'This password is too short')
      .max(password.max, 'This password is too long'),
  };

  const schema = Yup.object().shape(loginShape);

  if (formType === 'register') {
    const registerExtraSchema = Yup.object({
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match',
      ),
    });

    return schema.concat(registerExtraSchema);
  }
  return schema;
};
