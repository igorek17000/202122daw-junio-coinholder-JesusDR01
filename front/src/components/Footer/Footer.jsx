import React from 'react';
import { StyledFooter } from './Footer.styled';
import LanguageToggler from 'components/LanguageToggler/LanguageToggler';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <StyledFooter id="footer" component="footer">
      <Box id="utils">
        <LanguageToggler />
        <Link to="/about">🏢{t('nav.about')}</Link>
      </Box>
      <Box>
        {t('footer.rights')}

        <a href="https://policies.google.com/privacy" target="_blank">
          {t('footer.privacy')}
        </a> {t('footer.privacy2')}
        <a href="https://policies.google.com/terms" target="_blank">
          {t('footer.terms')}
        </a>{t('footer.terms2')}
      </Box>
    </StyledFooter>
  );
};
