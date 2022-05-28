import { Link, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledAbout } from './AboutScreen.styled';

export const AboutScreen = () => {
  const { t } = useTranslation();
  return (
    <StyledAbout id="about-screen">
      <Typography component="h1">{t('about.title')}</Typography>
      <Typography>{t('about.webDescription1')}</Typography>
      <Typography>{t('about.webDescription2')}</Typography>
      <Typography  component="h2">{t('about.originTitle')}</Typography>
      <Typography>{t('about.originDescription')}</Typography>

      <Typography component="h2">{t('about.developer')}</Typography>
      <Typography>
        {t('about.developerDescription1')}
        <Link href="https://github.com/JesusDR01" target="_blank">
          Github
        </Link>{' '}
        {t('about.developerDescription2')}{' '}
        <Link href="https://www.linkedin.com/in/jesusdr/" target="_blank">
          LinkedIn
        </Link>
      </Typography>
    </StyledAbout>
  );
};
