import { Avatar, Box, Button, Typography } from '@mui/material';
import { TransactionsDrawer } from 'components/TransactionsDrawer/TransactionsDrawer';
import { StyledTransactionsDrawer } from 'components/TransactionDrawer/TransactionDrawer.styled';
import React from 'react';
import { StyledCardCoin } from './CardCoin.styled';
import { CoinHeader } from '../CoinHeader/CoinHeader';
import DeleteIcon from '@mui/icons-material/Delete';

export const CardCoin = ({ data, isEditable, handleOpenDeleteCoinModal }) => {
  return (
    <StyledCardCoin>
      {isEditable && (
        <Button
          className="delete-coin"
          variant="contained"
          color="error" 
           onClick={() => handleOpenDeleteCoinModal(data._id)}
        >
          <DeleteIcon />
        </Button>
      )}
      <CoinHeader data={data} />
      {isEditable && (
        <TransactionsDrawer data={data}>
          <CoinHeader data={data} />
        </TransactionsDrawer>
      )}
    </StyledCardCoin>
  );
};
