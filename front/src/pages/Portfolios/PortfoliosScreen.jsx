import { MenuItem, Box, Paper, Fab, Button, Typography } from '@mui/material';
import {
  useGetPortfoliosQuery,
  useGetCoinsFromPortfolioQuery,
  useGetGlobalPortfolioQuery,
  portfoliosExtendedApi,
} from 'app/services/portfolios';
import { Loader } from 'components/Loader/Loader';
import { Portfolio } from 'components/Portfolio/Portfolio';
import { BasicSelect } from 'components/Select/Select';
import { StyledPortfolios } from './PortfoliosScreen.styled';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SyncIcon from '@mui/icons-material/Sync';
import { logout } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useResyncBinancePortfolioMutation } from 'app/services/binance';
import { useResyncKucoinPortfolioMutation } from 'app/services/kucoin';
import { useCreatePortfolio } from 'hooks/portfolio/useCreatePortfolio';
import GenericForm from 'components/GenericForm';
import * as yup from 'yup';
import { GenericModal } from 'components';
import { useDeletePortfolio } from 'hooks/portfolio/useDeletePortfolio';
import GenericDeleteModal from 'components/GenericDeleteModal';
import { selectCurrentPortfolio, setCurrentPortfolio } from 'features/portfolios/portfoliosSlice';
import { useGetPortfolio } from 'hooks/portfolio/useGetPortfolio';
import { useTranslation } from 'react-i18next';
import { PORTFOLIO_TYPES } from 'constants/portfolio';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import GenericErrorModal from 'components/GenericErrorModal';
import { current } from '@reduxjs/toolkit';
import { useResyncWalletPortfolioMutation } from 'app/services/wallet';
import { emptySplitApi } from 'app/services/baseAPI';

export const PortfoliosScreen = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { t } = useTranslation();
  const portfolioSelectedState = useState('');
  const dispatch = useDispatch();
  const [currentPortfolio, setCurrentPortoflio] = useState({});
  const { idPortfolio: reduxIdPortfolio } = useGetPortfolio();
  const [portfolioSelected, setPortfolioSelected] = portfolioSelectedState;

  const {
    data: portfoliosIdsResponse,
    isLoading: arePortfoliosLoading,
    error: errorGetPortfolios,
  } = useGetPortfoliosQuery();

  const {
    data: portfolioDataResponse,
    isFetching: areCoinsLoading,
    error: errorGetPortfolio,
  } = useGetCoinsFromPortfolioQuery(
    { id: portfolioSelected },
    {
      skip: Boolean(!portfolioSelected) || portfolioSelected === 'Global',
      refetchOnFocus: true,
    },
  );
  const isEditable = currentPortfolio?.portfolio?.editable;

  const {
    data: globalPortfolio,
    isFetching: isGlobalPortfolioFetching,
    refetch: refetchGlobalPortfolio,
    error: errorGetGlobalPortfolio,
  } = useGetGlobalPortfolioQuery(undefined, {
    skip: portfolioSelected !== 'Global',
    refetchOnFocus: true,
  });

  const portfolios = portfoliosIdsResponse?.portfolios;

  useEffect(() => {
    if (reduxIdPortfolio) {
      setPortfolioSelected(reduxIdPortfolio);
    } else if (portfolios) {
      setPortfolioSelected(portfolios[portfolios.length - 1]?.id);
    }
  }, [portfolios, reduxIdPortfolio]);

  useEffect(() => {
    if (portfolioSelected) {
      dispatch(setCurrentPortfolio(portfolioSelected));
    }
    if (portfolioSelected === 'Global') {
      refetchGlobalPortfolio();
    }
  }, [portfolioSelected]);

  if (
    errorGetPortfolios?.status === 401 ||
    errorGetPortfolio?.status === 401 ||
    errorGetGlobalPortfolio?.status === 401
  ) {
    dispatch(logout());
  }

  useEffect(() => {
    if (portfolioDataResponse) {
      setCurrentPortoflio(portfolioDataResponse);
    }
    if (globalPortfolio) {
      setCurrentPortoflio(globalPortfolio);
    }
  }, [portfolioDataResponse, globalPortfolio]);

  const [resyncBinance, { isLoading: isBinanceUpdating, error: errorResyncBinance }] =
    useResyncBinancePortfolioMutation();
  const [resyncKucoin, { isLoading: isKucoinUpdating, error: errorResyncKucoin }] =
    useResyncKucoinPortfolioMutation();

  const [resyncWallet, { isLoading: isWalletUpdating, error: errorResyncWallet }] =
    useResyncWalletPortfolioMutation();

  const {
    createPortfolioModalState,
    handleCreatePortfolio,
    isCreatingPortfolio,
    handleOpenCreatePortfolioModal,
    errorCreatingPortfolio,
  } = useCreatePortfolio();

  const {
    deletePortfolioModalState,
    handleDeletePortfolio,
    handleOpenDeletePortfolioModal,
    isDeletingPortfolio,
    handleCloseDeletePortfolioModal,
    errorDeletingPortfolio,
  } = useDeletePortfolio();

  const [error, setError] = useState(null);
  useEffect(() => {
    setError(
      errorDeletingPortfolio ||
        errorCreatingPortfolio ||
        errorResyncBinance ||
        errorResyncKucoin ||
        errorResyncWallet,
    );
  }, [
    errorDeletingPortfolio,
    errorCreatingPortfolio,
    errorResyncBinance,
    errorResyncKucoin,
    errorResyncWallet,
  ]);

  const createCoinModalState = useState(false);
  const [, setOpenCreateCoinModal] = createCoinModalState;
  const handleOpenCreateCoinModal = () => {
    setOpenCreateCoinModal(true);
  };

  const canBeDeleted = isEditable || currentPortfolio?.portfolio?.type === PORTFOLIO_TYPES.WALLET;
  const canBeSynced =
    currentPortfolio?.portfolio?.type &&
    currentPortfolio?.portfolio?.type !== PORTFOLIO_TYPES.GLOBAL;
  return arePortfoliosLoading || areCoinsLoading || isGlobalPortfolioFetching ? (
    <Loader />
  ) : (
    <StyledPortfolios>
      {portfolios?.length > 0 ? (
        isBinanceUpdating || isKucoinUpdating || isWalletUpdating ? (
          <Loader minHeight="45vh" />
        ) : (
          <>
            <Box id="portfolios-manager">
              <BasicSelect title="portfolios" elementSelectedState={portfolioSelectedState}>
                {portfolios.length > 0 && <MenuItem value={'Global'}>Global</MenuItem>}
                {portfolios &&
                  portfolios?.map((portfolio) => (
                    <MenuItem key={portfolio.id} value={portfolio.id}>
                      {portfolio.type === PORTFOLIO_TYPES.WALLET
                        ? t('walletPortfolio.title', {
                            title: `${portfolio.title.split('Wallet')[1]}`,
                          })
                        : portfolio.title}
                    </MenuItem>
                  ))}
              </BasicSelect>
              <Paper elevation={0} className="icon-wrapper">
                <Button
                  variant="contained"
                  className="btn-styled"
                  onClick={handleOpenCreatePortfolioModal}
                >
                  <AddIcon />
                </Button>

                {canBeDeleted && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleOpenDeletePortfolioModal}
                  >
                    <DeleteIcon />
                  </Button>
                )}

                {canBeSynced && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={async () => {
                      const token = await executeRecaptcha();
                      if (currentPortfolio?.portfolio?.type === PORTFOLIO_TYPES.BINANCE) {
                        resyncBinance({ id: portfolioSelected, 'g-recaptcha-response': token });
                      }
                      if (currentPortfolio?.portfolio?.type === PORTFOLIO_TYPES.KUCOIN) {
                        resyncKucoin({ id: portfolioSelected, 'g-recaptcha-response': token });
                      }
                      if (currentPortfolio?.portfolio?.type === PORTFOLIO_TYPES.WALLET) {
                        resyncWallet({ id: portfolioSelected, 'g-recaptcha-response': token });
                      }
                    }}
                  >
                    <SyncIcon />
                  </Button>
                )}
              </Paper>
            </Box>
            {currentPortfolio && (
              <Portfolio
                data={currentPortfolio}
                areCoinsLoading={areCoinsLoading}
                createCoinModalState={createCoinModalState}
              />
            )}

            {portfolioSelected && isEditable && (
              <Fab
                color="primary"
                aria-label="add"
                className="add-fab"
                onClick={handleOpenCreateCoinModal}
              >
                <AddIcon />
              </Fab>
            )}
          </>
        )
      ) : (
        <Box id="no-portfolios">
          <Button variant="contained" onClick={handleOpenCreatePortfolioModal}>
            {t('portfolios.create')}
          </Button>
          <Typography component="h2">
            <Link to="/import"> {t('portfolios.import')} </Link>
          </Typography>
        </Box>
      )}

      <GenericModal openState={createPortfolioModalState}>
        <Box id="form-wrapper">
          {isCreatingPortfolio ? (
            <Loader minHeight="45vh" />
          ) : (
            <GenericForm
              formInitialState={{ title: '' }}
              handleSubmit={handleCreatePortfolio}
              formTemplate={[{ name: 'title', label: t('forms.title.label'), type: 'text' }]}
              validationSchema={yup.object({
                title: yup.string().required(t('validations.errors.required.title')),
              })}
            >
              {t('portfolios.actions.create')}
            </GenericForm>
          )}
        </Box>
      </GenericModal>

      <GenericModal openState={deletePortfolioModalState}>
        <Box id="form-wrapper">
          {isDeletingPortfolio ? (
            <Loader minHeight="45vh" />
          ) : (
            <GenericDeleteModal
              handleAction={() => handleDeletePortfolio(portfolioSelected)}
              handleCloseModal={handleCloseDeletePortfolioModal}
              warningMessage={t('portfolios.actions.deleteWarning')}
              action={t('portfolios.actions.delete')}
            />
          )}
        </Box>
      </GenericModal>

      <GenericErrorModal setError={setError} error={error} />
    </StyledPortfolios>
  );
};
