//@ts-check
import React from 'react';
import { StyledHeader } from './HeaderFooterLayout.styled';
import Nav from '../Nav/Nav';
import Chains from 'components/Chains';
import { Logo } from 'components/Logo/Logo';
import { Box } from '@mui/material';
import { UserMenu } from '../UserMenu/UserMenu';
import LanguageToggler from 'components/LanguageToggler/LanguageToggler';

export const Header = () => {
  return (
    <StyledHeader>
      <Logo />
      <LanguageToggler/>
      <Nav />
      <Box id="management">
        <Chains />
        <UserMenu />
      </Box>
    </StyledHeader>
  );
};