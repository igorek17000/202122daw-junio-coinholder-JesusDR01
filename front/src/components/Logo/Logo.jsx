//@ts-check
import { Avatar } from '@mui/material';
import React from 'react';
import { LogoStyled } from './Logo.styled';

export const Logo = () => {
    
  return (
    <LogoStyled >
      <Avatar  src="/coinholder.svg" />
    </LogoStyled>
  );
};
