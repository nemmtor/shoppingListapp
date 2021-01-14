import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dashboard, NewListForm } from '../../../components';
import { INewListFormValues } from '../../../interfaces/INewListFormValues';
import { createBearerToken } from '../../../utils';

export const AddNewListPage: React.FC = () => {
  const history = useHistory();

  const handleSubmit = async (
    values: INewListFormValues,
  ): Promise<void | string> => {
    const token = localStorage.getItem('authToken');
    const bearer = createBearerToken(token as string);

    const { title, ...products } = values;

    const body = JSON.stringify({ title, ...products });
    const res = await fetch('http://localhost:4000/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearer,
      },
      body,
    });

    // If success
    if (res.status < 400) {
      return history.push('/dashboard/yourlists');
    }

    return 'There was an error';
  };
  return (
    <Dashboard>
      <NewListForm handleSubmit={handleSubmit} />
    </Dashboard>
  );
};
