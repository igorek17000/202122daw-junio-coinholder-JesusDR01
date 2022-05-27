import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TransactionDrawer } from '../TransactionDrawer/TransactionDrawer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { StyledTransactionsDrawer } from './TransactionsDrawer.styled';
import { useDispatch } from 'react-redux';
import { setCurrentCoin } from 'features/coins/coinsSlice';
export const TransactionsDrawer = ({ data, children,  }) => {
  const transactions = data?.transactions;
  const idCoin = data?._id;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    dispatch(setCurrentCoin(idCoin));
    setOpen(newOpen);
  };

  return (
    <StyledTransactionsDrawer >
      <Box>
        <Button onClick={toggleDrawer(true)}>
          <ArrowForwardIcon />
        </Button>
      </Box>
      <TransactionDrawer open={open} toggleDrawer={toggleDrawer} transactions={transactions}>
        {children}
      </TransactionDrawer>
    </StyledTransactionsDrawer>
  );
};

export default TransactionsDrawer;
