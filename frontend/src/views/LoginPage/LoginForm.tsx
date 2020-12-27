import React from 'react';
import { Button, makeStyles, Theme } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { IFormValues } from './IFormValues';
import { FormikTextField } from '../../components';

interface IProps {
  onSubmit: (values: IFormValues) => void;
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
  username: Yup.string().required('This field is required'),
  password: Yup.string().required('This field is required'),
});

const LoginForm: React.FC<IProps> = ({ onSubmit }) => {
  const styles = useStyles();

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values): void => {
        onSubmit(values);
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
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
