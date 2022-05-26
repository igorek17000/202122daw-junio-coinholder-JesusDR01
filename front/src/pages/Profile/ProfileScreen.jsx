//@ts-check
import { Box, Button, Typography } from '@mui/material';
import {
  useGetProfileQuery,
  useModifyBinanceAPIMutation,
  useModifyKucoinAPIMutation,
  useGetExistingPortfoliosQuery,
} from 'app/services/account';
import { GenericModal, KucoinForm, BinanceForm } from 'components';
import React, { useState } from 'react';
import { StyledProfile } from './ProfileScreen.styled';
import { useGenericUpdateMutation } from 'hooks/useGenericUpdateMutation';
import { Loader } from 'components/Loader/Loader';
import { Snack } from 'components/Snack/Snack';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { logout } from 'features/auth/authSlice';
import {cfg} from 'config/config'
export const ProfileScreen = () => {
  const { t } = useTranslation();
  const { data: existingPortfolios } = useGetExistingPortfoliosQuery();
  const { data: profile, isLoading: isProfileLoading, error } = useGetProfileQuery();
  const kucoinState = useState(false);
  const binanceState = useState(false);
  const dispatch = useDispatch();
  if (error?.status === 401) {
    dispatch(logout());
  }
  const [, setKucoinOpen] = kucoinState;
  const [, setBinanceOpen] = binanceState;
  const handleKucoinOpen = () => {
    setKucoinOpen(true);
  };
  const handleBinanceOpen = () => {
    setBinanceOpen(true);
  };

  const dataInitialStateKucoin = {
    passphrase: cfg.defaultDevValues.credentials.kucoinPassphrase,
    apiKey: cfg.defaultDevValues.credentials.kucoinKey,
    apiSecret: cfg.defaultDevValues.credentials.kucoinSecret,
  };
  const dataInitialStateBinance = {
    apiKey: cfg.defaultDevValues.credentials.binanceKey,
    apiSecret: cfg.defaultDevValues.credentials.binanceSecret,
  };
  
  const [modifyBinanceAPI, { data: binanceData, isLoading: isBinanceUpdating }] =
    useModifyBinanceAPIMutation();
  const [modifyKucoinAPI, { isLoading: isKucoinUpdating }] = useModifyKucoinAPIMutation();

  const {
    msgShown: kucoinMsgShown,
    setMsgShown: setKucoinMsgShown,
    handleSubmit: handleKucoinSubmit,
  } = useGenericUpdateMutation({
    formInitialState: dataInitialStateBinance,
    mutationFunction: modifyKucoinAPI,
  });

  const {
    msgShown: binanceMsgShown,
    setMsgShown: setBinanceMsgShown,
    handleSubmit: handleBinanceSubmit,
  } = useGenericUpdateMutation({
    formInitialState: dataInitialStateBinance,
    mutationFunction: modifyBinanceAPI,
  });

  return (
    <StyledProfile>
      {isProfileLoading ? (
        <Loader minHeight="20vh" />
      ) : (
        <>
          <Box id="data">
            <Typography component="h2">
              {t('profile.user')} {profile?.name}
            </Typography>
            <Typography component="h2">
              {t('profile.email')} {profile?.email}
            </Typography>
          </Box>
          <Box id="actions">
            {existingPortfolios?.kucoin && (
              <Button variant="contained" onClick={handleKucoinOpen}>
                {t('profile.actions.kucoin')}
              </Button>
            )}
            {existingPortfolios?.binance && (
              <Button variant="contained" onClick={handleBinanceOpen}>
                {t('profile.actions.binance')}
              </Button>
            )}
          </Box>
          <GenericModal openState={kucoinState}>
            <Box id="form-wrapper">
              {isKucoinUpdating ? (
                <Loader minHeight="45vh" />
              ) : (
                <KucoinForm
                  formInitialState={dataInitialStateKucoin}
                  handleSubmit={handleKucoinSubmit}
                >
                  {t('profile.actions.kucoin')}
                </KucoinForm>
              )}
            </Box>
          </GenericModal>
          <GenericModal openState={binanceState}>
            <Box>
              {isBinanceUpdating ? (
                <Loader minHeight="45vh" />
              ) : (
                <BinanceForm
                  formInitialState={dataInitialStateBinance}
                  handleSubmit={handleBinanceSubmit}
                >
                  {t('profile.actions.binance')}
                </BinanceForm>
              )}
            </Box>
          </GenericModal>
          <Snack
            severity={kucoinMsgShown.status}
            msgShown={kucoinMsgShown.msg}
            setMsgShown={setKucoinMsgShown}
          />
          <Snack
            severity={binanceMsgShown.status}
            msgShown={binanceMsgShown.msg}
            setMsgShown={setBinanceMsgShown}
          />
        </>
      )}
    </StyledProfile>
  );
};
