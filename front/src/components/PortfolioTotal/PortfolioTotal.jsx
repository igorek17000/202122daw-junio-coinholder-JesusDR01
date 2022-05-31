import React from 'react';
import { StyledPortfolioTotal } from './PortfolioTotal.styled';

export const PortfolioTotal = ({ total }) => {
  return <StyledPortfolioTotal id="total">Total: {total} $</StyledPortfolioTotal>;
};
