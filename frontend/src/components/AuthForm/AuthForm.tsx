import React from 'react';
import {
  Box,
  Button,
  makeStyles,
  Theme,
  Typography,
  Link,
} from '@material-ui/core';
import { AccountBox as AccountBoxIcon } from '@material-ui/icons';
import { Formik, Form, Field } from 'formik';
import { Link as RouterLink } from 'react-router-dom';

import { IAuthFormValues } from '../../interfaces';
import { FormikTextField } from '../FormikTextField';
import { IFormError } from '../../../../shared';
import { parseToFormikErrors } from '../../utils/parseToFormikErrors';
import { getValidationSchema } from './getValidationSchema';

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
  icon: {
    fontSize: '3rem',
    margin: '0 auto',
  },
  title: {
    letterSpacing: '0.08em',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

export const AuthForm: React.FC<IProps> = ({ handleSubmit, formType }) => {
  const styles = useStyles();
  const isLoginPage = formType === 'login';

  const yupSchema = getValidationSchema(formType);

  const formTitle = isLoginPage ? 'Login' : 'Register';

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={yupSchema}
      onSubmit={async (values, { setErrors }): Promise<void> => {
        const errors = await handleSubmit(values);
        if (errors) {
          // TODO: Handle new error, {field: 'form', error: string}
          const parsedErrors = parseToFormikErrors(errors);
          setErrors(parsedErrors);
        }
      }}
    >
      {({ errors }): JSX.Element => (
        <Form className={styles.form}>
          <AccountBoxIcon className={styles.icon} />
          <Box sx={{ marginBottom: 4 }}>
            <Typography component="h1" variant="h6" className={styles.title}>
              {formTitle}
            </Typography>
          </Box>
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
            <Box sx={{ marginTop: 4 }}>
              Not having an account yet?
              <Typography>
                <Link to="/register" component={RouterLink}>
                  Click here to register
                </Link>
              </Typography>
            </Box>
          )}
          {!isLoginPage && (
            <Box sx={{ marginTop: 4 }}>
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
