/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Typography,
  List,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@material-ui/core';

import { Dashboard } from '../../../components';
import { createBearerToken } from '../../../utils';
import { API_URL } from '../../../config';

interface IProduct {
  name: string;
}

interface IList {
  title: string;
  createdAt: string;
  products: IProduct[];
}

export const SingleListPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const [list, setList] = useState<IList | null>(null);
  const [checked, setChecked] = useState<string[]>([]);

  if (!params.id) {
    history.push('/');
  }

  const handleToggle = (value: string) => (): void => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const token = localStorage.getItem('authToken');
      const bearer = createBearerToken(token as string);
      const res = await fetch(`${API_URL}/list/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearer,
        },
      });
      const json = await res.json();
      setList(json.list);
    };
    fetchData();
  }, [params.id]);

  if (!list) {
    return (
      <Dashboard>
        <p>Loading...</p>
      </Dashboard>
    );
  }

  return (
    <Dashboard>
      <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
        <Box sx={{ marginRight: 1 }}>
          <Typography variant="h3">{list.title}</Typography>
        </Box>
        <Typography variant="caption">
          Created at: {new Date(list.createdAt).toLocaleDateString('pl')}
        </Typography>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h5">Products:</Typography>
        <List>
          {list.products.map(({ name }) => (
            <ListItem
              key={name}
              sx={{ maxWidth: 200 }}
              onClick={handleToggle(name)}
              button
            >
              <ListItemIcon>
                <Checkbox edge="start" checked={checked.indexOf(name) !== -1} />
              </ListItemIcon>
              <ListItemText>{name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </Dashboard>
  );
};
