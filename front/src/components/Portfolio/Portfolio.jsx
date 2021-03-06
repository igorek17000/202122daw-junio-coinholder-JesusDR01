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
import { PORTFOLIO_TYPES } from 'constants/portfolio';
import { AnimatePresence, motion } from 'framer-motion';
export const Portfolio = ({ data, areCoinsLoading, createCoinModalState, setTotal }) => {
  const coins = data?.portfolio?.coins;
  const { t } = useTranslation();

  const [, setOpenCreateCoinModal] = createCoinModalState;
  const isEditable = data?.portfolio?.editable;
  const canHandleVisibility = !isEditable && data?.portfolio?.type !== PORTFOLIO_TYPES.GLOBAL;
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

  const sortByVisibility = (coins) =>
    coins
      .slice()
      .sort((a, b) =>
        Boolean(a?.invisible) === Boolean(b?.invisible) ? 0 : Boolean(a?.invisible) ? 1 : -1,
      );

  const getTotalInvestment = (coins) =>
    coins?.filter((coin) => !coin.invisible)?.reduce((acc, coin) => acc + getInvestment(coin), 0);
  const totalInvestment = getTotalInvestment(coins);
  useEffect(() => {
    setTotal(totalInvestment?.toFixed(3));
  }, [setTotal, totalInvestment])
  
  const sortCoins = (coins) => {
    const sortedCoins = sortByParsedInvestment(coins);
    return sortByVisibility(sortedCoins);
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: { type: 'spring', bounce: 0.4 },
    },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', bounce: 0.4 } },
  };

  return (
    <AnimatePresence>
      <StyledPortfolio
        key={data?.portfolio?.id}
        matches={matches}
        component={motion.div}
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.7 }}
      >
        {areCoinsLoading ? (
          <Loader />
        ) : coins?.length > 0 ? (
          <>
            {sortCoins(coins).map((coin) =>
              matches ? (
                <AccordionCoin
                  variants={itemVariants}
                  data={coin}
                  key={coin._id}
                  isEditable={isEditable}
                  canHandleVisibility={canHandleVisibility}
                  handleOpenDeleteCoinModal={handleOpenDeleteCoinModal}
                />
              ) : (
                <CardCoin
                  data={coin}
                  key={coin._id}
                  canHandleVisibility={canHandleVisibility}
                  isEditable={isEditable}
                  handleOpenDeleteCoinModal={handleOpenDeleteCoinModal}
                />
              ),
            )}
          </>
        ) : (
          <Box id="no-coins">
            <Typography variant="h2">{t('coins.empty')}</Typography>
            {isEditable && (
              <Button variant="contained" onClick={() => setOpenCreateCoinModal(true)}>
                {t('coins.actions.add')}
              </Button>
            )}
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
    </AnimatePresence>
  );
};
