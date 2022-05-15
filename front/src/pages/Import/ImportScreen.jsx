import { Avatar, Box, Button, Typography } from '@mui/material';
import { useGetExistingPortfoliosQuery } from 'app/services/account';
import React from 'react';
import { Link } from 'react-router-dom';
import { StyledImportScreen } from './ImportScreen.styled';
import { Loader } from 'components/Loader/Loader';
import { useTranslation } from 'react-i18next';
export const ImportScreen = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetExistingPortfoliosQuery();

  return (
    <StyledImportScreen component="main">
      {data?.binance && data?.kucoin ? (
        <Typography component="h2">{t('import.checkProfile')}</Typography>
      ) : (
        <Typography component="h2">{t('import.choose')}</Typography>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <Box id="import-wrapper">
          {!data?.binance && (
            <Link to="/binance">
              <Box id="binance-wrapper">
                <Avatar src="/assets/binance.svg" />
                <Typography>Binance</Typography>
              </Box>
            </Link>
          )}
          {!data?.kucoin && (
            <Link to="/kucoin">
              <Box id="kucoin-wrapper">
                <Avatar src="/assets/kucoin.png" />
                <Typography>Kucoin</Typography>
              </Box>
            </Link>
          )}
        </Box>
      )}
    </StyledImportScreen>
  );
};
