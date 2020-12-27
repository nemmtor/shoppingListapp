import React from 'react';
import { TextField } from '@material-ui/core';
import { FieldProps } from 'formik';

interface IProps extends FieldProps {
  className: string;
  label: string;
  type: string;
}

export const FormikTextField: React.FC<IProps> = ({
  className,
  label,
  field,
  form,
  type = 'text',
}) => {
  const { value, onChange, onBlur, name } = field;
  const { errors, touched } = form;

  const isTouched = !!touched[`${name}`];
  const error = isTouched && errors[`${name}`];
  const hasError = isTouched && !!error;
  return (
    <TextField
      className={className}
      name={name}
      label={label}
      value={value}
      error={hasError}
      helperText={error}
      onChange={onChange}
      onBlur={onBlur}
      type={type}
    />
  );
};
