import { Avatar, Box, Button, Paper, Typography } from '@mui/material';
import { TransactionsDrawer } from 'components/TransactionsDrawer/TransactionsDrawer';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import React from 'react';
import { StyledCardCoin } from './CardCoin.styled';
import { CoinHeader } from '../CoinHeader/CoinHeader';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUpdateCoinMutation } from 'app/services/coins';

export const CardCoin = ({ data, isEditable, canHandleVisibility, handleOpenDeleteCoinModal }) => {
  const [update] = useUpdateCoinMutation();
  return (
    <StyledCardCoin elevation={5} className="card-coin" invisible={data.invisible}>
      {canHandleVisibility &&
        (data.invisible ? (
          <Button
            className="delete-coin"
            variant="contained"
            color="primary"
            onClick={() => update({ id: data._id, invisible: false })}
          >
            <VisibilityIcon />
          </Button>
        ) : (
          <Button
            className="delete-coin"
            variant="contained"
            color="primary"
            onClick={() => update({ id: data._id, invisible: true })}
          >
            <VisibilityOffIcon />
          </Button>
        ))}

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
