import React from 'react';
import { Form, Formik, Field } from 'formik';

import { Button } from '@material-ui/core';
import { FormikTextField } from '../FormikTextField';

export const NewListForm: React.FC = () => {
  return (
    <Formik
      initialValues={{ title: '' }}
      onSubmit={(values): void => {
        console.log(values);
      }}
    >
      {(): JSX.Element => (
        <Form>
          <Field name="title" label="List title" component={FormikTextField} />
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
};
