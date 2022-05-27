import React from 'react';
import { StyledGenericLayout } from './GenericLayout.styled';
import { Outlet } from 'react-router-dom';
export const GenericLayout = () => {
  return (
    <StyledGenericLayout id="generic-layout">
      <Outlet />
    </StyledGenericLayout>
  );
};
