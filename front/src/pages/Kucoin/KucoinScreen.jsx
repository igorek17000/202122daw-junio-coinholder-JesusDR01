import { Box, Button } from '@mui/material';
import { Typography } from 'antd';
import { useGetExistingPortfoliosQuery } from 'app/services/account';
import { useCreateKucoinPortfolioMutation } from 'app/services/kucoin';
import { GenericModal } from 'components';
import KucoinForm from 'components/KucoinForm';
import KucoinGuide from 'components/KucoinGuide';
import { Loader } from 'components/Loader/Loader';
import Snack from 'components/Snack/Snack';
import { useImport } from 'hooks/useImport';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate } from 'react-router-dom';
import { StyledKucoinScreen } from './KucoinScreen.styled';

import { cfg } from 'config/config';
export const KucoinScreen = () => {
  const { t } = useTranslation();
  const { data: existingPortfoliosData, isLoading: isGettingExistingPortfolios } =
    useGetExistingPortfoliosQuery();
  const openState = useState(false);
  const [, setOpenModal] = openState;
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const [createKucoinPortfolio, { isLoading: isCreating }] = useCreateKucoinPortfolioMutation();
  const dataInitialState = {
    passphrase: cfg.defaultDevValues.credentials.kucoinPassphrase,
    apiKey: cfg.defaultDevValues.credentials.kucoinKey,
    apiSecret: cfg.defaultDevValues.credentials.kucoinSecret,
  };

  const { data, msgShown, setMsgShown, handleSubmit } = useImport({
    formInitialState: dataInitialState,
    importPortfolio: createKucoinPortfolio,
  });
  if (existingPortfoliosData?.kucoin) {
    return <Navigate to="/" />;
  }

  return (
    <StyledKucoinScreen className="animate__animated animate__fadeIn">
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
            <Typography component="h3">
              {t('kucoin.info')}
              <Typography component="a" onClick={handleOpenModal}>
                {t('kucoin.link')}
              </Typography>
            </Typography>
            <Typography>{t('kucoin.remember')}</Typography>
            <Typography>
              {t('kucoin.changeCredentials')}
              <Link to="/profile">{t('kucoin.profilelink')}</Link>
            </Typography>
            <GenericModal openState={openState}>
              <KucoinGuide />
            </GenericModal>
          </Box>
          {isCreating ? (
            <Loader minHeight="45vh" />
          ) : (
            <KucoinForm formInitialState={data} handleSubmit={handleSubmit}>
              {t('kucoin.action')}
            </KucoinForm>
          )}
        </>
      )}
      <Snack severity={msgShown.status} msgShown={msgShown.msg} setMsgShown={setMsgShown} />
    </StyledKucoinScreen>
  );
};
