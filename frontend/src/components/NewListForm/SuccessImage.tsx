import { Box } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

import Icon from './success.svg';

interface Props {
  className: string;
}

export const SuccessImage: React.FC<Props> = ({ className }) => {
  const ref = useRef();

  useEffect(() => {
    gsap.from((ref.current as unknown) as string, {
      y: 100,
      opacity: 0,
      duration: 0.5,
    });
  }, []);

  return (
    <Box ref={ref} className={className}>
      <img src={Icon} alt="success" />
    </Box>
  );
};
