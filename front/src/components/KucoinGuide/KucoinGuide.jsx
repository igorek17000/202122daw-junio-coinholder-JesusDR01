import { Typography, Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledKucoinGuide } from './KucoinGuide.styled';

export const KucoinGuide = () => {
  const { t } = useTranslation();
  return (
    <StyledKucoinGuide>
      <Typography component="h2">{t('guides.kucoin.title')}</Typography>

      <Box id="guide">
        <Typography>
          {t('guides.kucoin.step1.1')}

          <Typography component="a" href={t('guides.kucoin.step1url')} target="_blank">
            {t('guides.kucoin.step1.2')}
          </Typography>
        </Typography>
        <Typography>
          {t('guides.kucoin.step2')}
        </Typography>
          <img src={t('guides.kucoin.step2img')} alt="Kucoin settings" />
        <Typography>
          {t('guides.kucoin.step3')}
        </Typography>
          <img src={t('guides.kucoin.step3img')} alt="Kucoin verification" />
        <Typography>
          {t('guides.kucoin.step4')}
          <img src={t('guides.kucoin.step4img')} alt="Kucoin verification" />
        </Typography>
      </Box>
    </StyledKucoinGuide>
  );
};
