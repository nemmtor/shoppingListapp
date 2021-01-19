import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Link, Typography } from '@material-ui/core';

import { Dashboard } from '../../../components';
import { createBearerToken } from '../../../utils';
import { API_URL } from '../../../config';

export const YourListsPage: React.FC = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const token = localStorage.getItem('authToken');
      const bearer = createBearerToken(token as string);
      const res = await fetch(`${API_URL}/list`, {
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
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h4">Your lists:</Typography>
      </Box>
      {lists?.length > 0 &&
        lists.map(({ id, title }) => (
          <Box key={id} sx={{ marginBottom: 1 }}>
            <Link component={RouterLink} to={`/dashboard/yourlists/${id}`}>
              <Button variant="outlined">{title}</Button>
            </Link>
          </Box>
        ))}
    </Dashboard>
  );
};
