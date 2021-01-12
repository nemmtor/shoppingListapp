import React from 'react';
import { Dashboard, NewListForm } from '../../../components';
import { INewListFormValues } from '../../../interfaces/INewListFormValues';

export const AddNewListPage: React.FC = () => {
  const handleSubmit = async (
    values: INewListFormValues,
  ): Promise<void | string> => {
    const token = localStorage.getItem('authToken');
    const { title, ...products } = values;
    const body = JSON.stringify({ title, token, ...products });
    const res = await fetch('http://localhost:4000/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    // If success
    if (res.status < 400) {
      return console.log('Ok, added new list!');
    }

    return 'There was an error';
  };
  return (
    <Dashboard>
      <NewListForm handleSubmit={handleSubmit} />
    </Dashboard>
  );
};
