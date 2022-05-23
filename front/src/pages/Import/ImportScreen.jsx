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
             <Link to="/WalletImport">
              <Box id="address-wrapper">
                <Avatar className="avatar" src="/assets/WalletIcons/metamaskWallet.png" />
                <Typography>{t('walletPortfolio.wallet')}</Typography>
              </Box>
            </Link>
        </Box>
      )}
    </StyledImportScreen>
  );
};
