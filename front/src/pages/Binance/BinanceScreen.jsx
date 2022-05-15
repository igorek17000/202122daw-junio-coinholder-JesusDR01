//@ts-check
import React from 'react';
import { StyledBinanceScreen } from './BinanceScreen.styled';
import { Box, Button } from '@mui/material';
import { Typography } from 'antd';
import { useGetExistingPortfoliosQuery } from 'app/services/account';
import { GenericModal } from 'components';
import BinanceForm from 'components/BinanceForm';
import { Loader } from 'components/Loader/Loader';
import Snack from 'components/Snack/Snack';
import { useImport } from 'hooks/useImport';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCreateBinancePortfolioMutation } from 'app/services/binance';
import BinanceGuide from 'components/BinanceGuide';
import { useTranslation } from 'react-i18next';

export const BinanceScreen = () => {
  const { t } = useTranslation();
  const {
    data: existingPortfoliosData,
    isLoading: isGettingExistingPortfolios,
    isError,
  } = useGetExistingPortfoliosQuery();
  const openState = useState(false);
  const [, setOpenModal] = openState;
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const [createBinancePortfolio, { isLoading: isCreating }] = useCreateBinancePortfolioMutation();
  const dataInitialState = {
    apiKey: '',
    apiSecret: '',
  };

  const { data, msgShown, setMsgShown, handleSubmit } = useImport({
    formInitialState: dataInitialState,
    importPortfolio: createBinancePortfolio,
  });

  if (existingPortfoliosData?.binance || isError) {
    return <Navigate to="/" />;
  }

  return (
    <StyledBinanceScreen>
      <Link to="/import">
        <Button variant="outlined" id="back">
          {t('import.back')}
        </Button>
      </Link>
      {isGettingExistingPortfolios ? (
        <Loader minHeight="45vh" />
      ) : (
        <>
          <Box id="info">
            <Typography
              // @ts-ignore
              component="h3"
            >
              {t('binance.info')}
              <Typography
                // @ts-ignore
                component="a"
                onClick={handleOpenModal}
              >
                {t('binance.link')}
              </Typography>
            </Typography>
            <Typography>{t('binance.remember')}</Typography>
            <Typography>
              {t('binance.changeCredentials')}
              <Link to="/profile">{t('binance.profilelink')}</Link>
            </Typography>
            <GenericModal openState={openState}>
              <BinanceGuide />
            </GenericModal>
          </Box>
          {isCreating ? (
            <Loader minHeight="45vh" />
          ) : (
            <BinanceForm formInitialState={data} handleSubmit={handleSubmit}>
              {t('binance.action')}
            </BinanceForm>
          )}
        </>
      )}
      <Snack severity={msgShown.status} msgShown={msgShown.msg} setMsgShown={setMsgShown} />
    </StyledBinanceScreen>
  );
};
