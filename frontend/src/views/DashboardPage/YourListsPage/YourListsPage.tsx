import React, { useEffect, useState } from 'react';
import { Dashboard } from '../../../components';
import { createBearerToken } from '../../../utils';

export const YourListsPage: React.FC = () => {
  const [lists, setLists] = useState(['']);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const token = localStorage.getItem('authToken');
      const bearer = createBearerToken(token as string);
      const res = await fetch('http://localhost:4000/list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearer,
        },
      });

      const json = await res.json();
      setLists(json.lists);
    };
    fetchData();
  }, []);

  return (
    <Dashboard>
      {lists.length > 0 && lists.map((list) => <p>{list}</p>)}
    </Dashboard>
  );
};
