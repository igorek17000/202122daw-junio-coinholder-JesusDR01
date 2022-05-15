import { Avatar, Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledCoinHeader } from './CoinHeader.styled';

export function CoinHeader({ data }) {
  const { t } = useTranslation();
  const investment = data.transactions
    .filter((trans) => !trans.disabled)
    .reduce(
      (acc, trans) => (trans.type === 'buy' ? acc + trans.investment : acc - trans.investment),
      0,
    );

  const investmentToUsd = (investment * data?.price).toFixed(2);

  return (
    <StyledCoinHeader className="coin-header">
      <Box className="logo-wrapper">
        <Avatar src={data?.image} className="logo" />
        <Typography>
          {data?.name} ({data?.symbol})
        </Typography>
      </Box>
      <Box className="coin-data-wrapper">
        <Box>
          <Typography>
            <Typography>{t('coins.header.investment')}</Typography>
            <Typography className="investment" component="span">
              {investment}
            </Typography>
            <Typography component="span">({investmentToUsd})$</Typography>
          </Typography>
          <Typography></Typography>
        </Box>
        <Box>
          <Typography>{t('coins.header.price')}</Typography>
          <Typography>{data?.price?.toFixed(2)}$</Typography>
        </Box>
      </Box>
    </StyledCoinHeader>
  );
}
