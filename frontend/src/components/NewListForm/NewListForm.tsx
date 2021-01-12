import { Button, makeStyles, Theme } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { INewListFormValues } from '../../interfaces/INewListFormValues';
import { FormikTextField } from '../FormikTextField';
import { SuccessImage } from './SuccessImage';

interface Props {
  handleSubmit: (values: INewListFormValues) => Promise<void | string>;
}

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  titleInput: {
    alignSelf: 'stretch',
    marginBottom: theme.spacing(3),
  },
  textFieldContainer: {
    marginBottom: theme.spacing(2),
    display: 'flex',
  },
  textField: {
    marginRight: theme.spacing(2),
  },
  lastInputContainer: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  lastInput: {
    marginBottom: 0,
    marginRight: theme.spacing(2),
  },
  successImageContainer: {
    position: 'absolute',
    bottom: 0,
    left: theme.spacing(3),
    width: '200px',
    height: '200px',
  },
}));

export const NewListForm: React.FC<Props> = ({ handleSubmit }) => {
  const styles = useStyles();
  const [productsNumbers, setProductsNumbers] = useState([0]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAddProduct = (): void => {
    setProductsNumbers((prevState) => {
      const nextIndex = prevState[prevState.length - 1] + 1;
      return [...prevState, nextIndex];
    });
  };

  const handleRemoveProduct = (productNumber: number): void => {
    setProductsNumbers((prevState) =>
      prevState.filter((stateProductNumber) => {
        return stateProductNumber !== productNumber;
      }),
    );
  };

  return (
    <Formik
      initialValues={{ title: '' }}
      onSubmit={(values): void => {
        handleSubmit(values);
        setIsSubmitted(true);
      }}
    >
      {(): JSX.Element => (
        <Form className={styles.form}>
          <Field
            className={styles.titleInput}
            name="title"
            label="List title"
            component={FormikTextField}
          />
          {productsNumbers.map((productNumber, index) => {
            return (
              <div className={styles.textFieldContainer} key={productNumber}>
                <Field
                  name={`product-${productNumber}`}
                  className={styles.textField}
                  label="Product to buy"
                  component={FormikTextField}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={(): void => {
                    handleRemoveProduct(productNumber);
                  }}
                  disabled={index === 0 && productsNumbers.length === 1}
                >
                  -
                </Button>
              </div>
            );
          })}
          <Button
            variant="outlined"
            sx={{ marginBottom: 5 }}
            color="secondary"
            type="button"
            onClick={(): void => {
              handleAddProduct();
            }}
          >
            +1 item
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save list
          </Button>
          {isSubmitted && (
            <SuccessImage className={styles.successImageContainer} />
          )}
        </Form>
      )}
    </Formik>
  );
};
