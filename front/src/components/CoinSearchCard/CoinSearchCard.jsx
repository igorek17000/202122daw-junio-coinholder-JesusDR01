import React from 'react';
import { StyledCoinSearchCard } from './CoinSearchCard.styled';
import { CoinHeader } from '../CoinHeader/CoinHeader';
import { Box, Avatar, Typography } from '@mui/material';

export const CoinSearchCard = ({ data,handleCreateCoin }) => {
  
  const rank = data?.market_cap_rank;
  
  return (
    <StyledCoinSearchCard id="coin-search-card" onClick={() => handleCreateCoin(data)}>
      <Box id="basic-data">
        <Avatar src={data?.large} className="logo" />
        <Typography>
          {data?.name} ({data?.symbol})
        </Typography>
      </Box>
      {rank && <Typography>#{rank}</Typography>}
    </StyledCoinSearchCard>
  );
};
