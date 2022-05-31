import React from 'react';
import { StyledColorModeToggler } from './ColorModeToggler.styled';

import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDispatch } from 'react-redux';
import { setCurrentTheme } from 'features/theme/themeSlice';
import { THEMES } from 'constants/portfolio';
import { useGetTheme } from 'hooks/theme/useGetTheme';

export const ColorModeToggler = () => {
  const {theme} = useGetTheme();
  const dispatch = useDispatch();
  const handleToggleTheme = () => {
    dispatch(setCurrentTheme(theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT));
  };
  return (
    <StyledColorModeToggler id="color-mode">
      <IconButton id="icon-toggle" onClick={handleToggleTheme} color="inherit">
        {theme === THEMES.DARK ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </StyledColorModeToggler>
  );
};
