import React from 'react';
import { Helmet } from 'react-helmet';

interface IProps {
  title: string;
  Component: React.FC;
}

export const Page: React.FC<IProps> = ({ title, Component }) => (
  <>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Component />
  </>
);
