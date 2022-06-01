import React from 'react';
import { StyledGenericLayout } from './GenericLayout.styled';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
export const GenericLayout = () => {
  const matches = useMediaQuery('(max-width:600px)');
  return (
    <StyledGenericLayout id="generic-layout" isMobile={matches}>
      <Outlet />
    </StyledGenericLayout>
  );
};
