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

import { IFormValues } from './IFormValues';
import { FormikTextField } from '../../components';
import { IFormError } from '../../../../shared';
import { parseToFormikErrors } from '../../utils/parseToFormikErrors';

interface IProps {
  handleSubmit: (values: IFormValues) => Promise<void | IFormError[]>;
  errors?: IFormError[];
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

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('This field is required')
    .min(4, 'This username is too short')
    .max(15, 'This username is too long'),
  // TODO: Change 6 to CONFIG.MIN_PW_LENGTH (Need to store some of config in shared dir)
  password: Yup.string()
    .required('This field is required')
    .min(6, 'This password is too short')
    .max(20, 'This password is too long'),
});

const LoginForm: React.FC<IProps> = ({ handleSubmit }) => {
  const styles = useStyles();

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
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
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
          <Box mt={2}>
            Not having an account yet?
            <Typography>
              <Link to="/register" component={RouterLink}>
                Click here to register
              </Link>
            </Typography>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
