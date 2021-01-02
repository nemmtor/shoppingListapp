import React from 'react';
import {
  Box,
  Button,
  makeStyles,
  Theme,
  Typography,
  Link,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';

import { IAuthFormValues } from '../../interfaces';
import { FormikTextField } from '../FormikTextField';
import { IFormError, validations } from '../../../../shared';
import { parseToFormikErrors } from '../../utils/parseToFormikErrors';

type TFormType = 'register' | 'login';

interface IProps {
  handleSubmit: (values: IAuthFormValues) => Promise<void | IFormError[]>;
  formType: TFormType;
}

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const {
  MIN_PW_LENGTH,
  MAX_PW_LENGTH,
  MIN_UNAME_LENGTH,
  MAX_UNAME_LENGTH,
} = validations;

const yupLoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('This field is required')
    .min(MIN_UNAME_LENGTH, 'This username is too short')
    .max(MAX_UNAME_LENGTH, 'This username is too long'),
  password: Yup.string()
    .required('This field is required')
    .min(MIN_PW_LENGTH, 'This password is too short')
    .max(MAX_PW_LENGTH, 'This password is too long'),
});
const yupRegisterSchema = Yup.object().shape({
  username: Yup.string()
    .required('This field is required')
    .min(MIN_UNAME_LENGTH, 'This username is too short')
    .max(MAX_UNAME_LENGTH, 'This username is too long'),
  password: Yup.string()
    .required('This field is required')
    .min(MIN_PW_LENGTH, 'This password is too short')
    .max(MAX_PW_LENGTH, 'This password is too long'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});

export const AuthForm: React.FC<IProps> = ({ handleSubmit, formType }) => {
  const styles = useStyles();
  const isLoginPage = formType === 'login';

  const yupSchema = isLoginPage ? yupLoginSchema : yupRegisterSchema;

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={yupSchema}
      onSubmit={async (values, { setErrors }): Promise<void> => {
        const errors = await handleSubmit(values);
        if (errors) {
          const parsedErrors = parseToFormikErrors(errors);
          setErrors(parsedErrors);
        }
      }}
    >
      {({ errors }): JSX.Element => (
        <Form className={styles.form}>
          <Field
            className={styles.textField}
            name="username"
            label="Username"
            error={errors.username}
            component={FormikTextField}
          />
          <Field
            className={styles.textField}
            name="password"
            label="Password"
            component={FormikTextField}
            type="password"
          />
          {!isLoginPage && (
            <Field
              className={styles.textField}
              name="confirmPassword"
              label="Confirm password"
              component={FormikTextField}
              type="password"
            />
          )}
          <Button variant="contained" color="primary" type="submit">
            {isLoginPage ? 'Login' : 'Register'}
          </Button>
          {isLoginPage && (
            <Box mt={2}>
              Not having an account yet?
              <Typography>
                <Link to="/register" component={RouterLink}>
                  Click here to register
                </Link>
              </Typography>
            </Box>
          )}
          {!isLoginPage && (
            <Box mt={2}>
              Already have an account?
              <Typography>
                <Link to="/login" component={RouterLink}>
                  Click here to login
                </Link>
              </Typography>
            </Box>
          )}
        </Form>
      )}
    </Formik>
  );
};
