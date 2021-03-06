import React from 'react';
import { StyledPortfoliosLayout } from './PortfoliosLayout.styled';
import { Outlet } from 'react-router-dom';
export const PortfoliosLayout = () => {
  return (
    <StyledPortfoliosLayout id="portfolios-layout">
      <Outlet />
    </StyledPortfoliosLayout>
  );
};
