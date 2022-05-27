import React from 'react';
import { StyledBinanceGuide } from './BinanceGuide.styled';
import { Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const BinanceGuide = () => {
  const { t } = useTranslation();
  return (
    <StyledBinanceGuide>
      <Typography component="h2">{t('guides.binance.title')}</Typography>
      <Box id="guide">
        <Typography>
          {t('guides.binance.step1.1')}
          <Typography component="a" href={t('guides.binance.step1url')} target="_blank">
            {t('guides.binance.step1.2')}
          </Typography>
        </Typography>
        <Typography>
          {t('guides.binance.step2')}
        </Typography>
          <img src={t('guides.binance.step2img')} alt="Binance verification" />
        <Typography>
          {t('guides.binance.step3')}
        </Typography>
          <img src={t('guides.binance.step3img')} alt="Binance verification" />
      </Box>
    </StyledBinanceGuide>
  );
};
