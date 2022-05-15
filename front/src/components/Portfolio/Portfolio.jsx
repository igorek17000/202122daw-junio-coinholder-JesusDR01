import { Box, Button, Portal, Typography, useMediaQuery } from '@mui/material';
import { AccordionCoin } from 'components/CoinAccordion/Coin';
import { CardCoin } from 'components/CoinCard/CardCoin';
import React, { useEffect, useState } from 'react';
import { StyledPortfolio } from './Portfolio.styled';
import { Loader } from 'components/Loader/Loader';
import { useCreateCoin } from 'hooks/coin/useCreateCoin';
import GenericModal from 'components/GenericModal';
import CoinSearch from 'components/CoinSearch';
import { useDeleteCoin } from 'hooks/coin/useDeleteCoin';
import GenericDeleteModal from 'components/GenericDeleteModal';
import { useTranslation } from 'react-i18next';
import GenericErrorModal from 'components/GenericErrorModal';
export const Portfolio = ({ data, areCoinsLoading, createCoinModalState }) => {
  const { t } = useTranslation();

  const [, setOpenCreateCoinModal] = createCoinModalState;
  const isEditable = data?.portfolio?.editable;

  const matches = useMediaQuery('(min-width:600px)');

  const { handleCreateCoin, isCreatingCoin, errorCreatingCoin } = useCreateCoin(
    data?.portfolio?.id,
    setOpenCreateCoinModal,
  );
  const {
    deleteCoinModalState,
    handleCloseDeleteCoinModal,
    handleDeleteCoin,
    handleOpenDeleteCoinModal,
    isDeletingCoin,
    errorDeletingCoin,
  } = useDeleteCoin();
  const [error, setError] = useState(null);
  useEffect(() => {
    if (errorCreatingCoin || errorDeletingCoin) {
      setError(errorCreatingCoin || errorDeletingCoin);
    }
  }, [errorCreatingCoin, errorDeletingCoin]);

  const getInvestment = (coin) => {
    const investment = coin.transactions
      .filter((trans) => !trans.disabled)
      .reduce(
        (acc, trans) => (trans.type === 'buy' ? acc + trans.investment : acc - trans.investment),
        0,
      );
    const investmentToUsd = investment * coin?.price;
    return investmentToUsd;
  };

  const sortByParsedInvestment = (coins) =>
    coins.slice().sort((a, b) => getInvestment(b) - getInvestment(a));

  const getTotalInvestment = (coins) => coins?.reduce((acc, coin) => acc + getInvestment(coin), 0);
  const totalInvestment = getTotalInvestment(data?.portfolio?.coins);
  return (
    <StyledPortfolio matches={matches}>
      {areCoinsLoading ? (
        <Loader />
      ) : data?.portfolio?.coins.length > 0 ? (
        <>
        <Typography id="total">Total: {totalInvestment.toFixed(3)} $</Typography>
          {sortByParsedInvestment(data?.portfolio.coins).map((coin) =>
            matches ? (
              <AccordionCoin
                data={coin}
                key={coin._id}
                isEditable={isEditable}
                handleOpenDeleteCoinModal={handleOpenDeleteCoinModal}
              />
            ) : (
              <CardCoin
                data={coin}
                key={coin._id}
                isEditable={isEditable}
                handleOpenDeleteCoinModal={handleOpenDeleteCoinModal}
              />
            ),
          )}
        </>
      ) : (
        <Box id="no-coins">
          <Typography variant="h2">{t('coins.empty')}</Typography>
          <Button variant="contained" onClick={() => setOpenCreateCoinModal(true)}>
            {t('coins.actions.add')}
          </Button>
        </Box>
      )}
      <GenericModal openState={createCoinModalState}>
        <Box id="form-wrapper">
          {isCreatingCoin ? (
            <Loader minHeight="45vh" />
          ) : (
            <CoinSearch handleCreateCoin={handleCreateCoin} />
          )}
        </Box>
      </GenericModal>

      <GenericModal openState={deleteCoinModalState}>
        <Box id="form-wrapper">
          {isDeletingCoin ? (
            <Loader minHeight="45vh" />
          ) : (
            <GenericDeleteModal
              handleAction={handleDeleteCoin}
              handleCloseModal={handleCloseDeleteCoinModal}
              warningMessage={t('coins.actions.deleteWarning')}
              action={t('coins.actions.delete')}
            />
          )}
        </Box>
      </GenericModal>

      <GenericErrorModal error={error} />
    </StyledPortfolio>
  );
};
