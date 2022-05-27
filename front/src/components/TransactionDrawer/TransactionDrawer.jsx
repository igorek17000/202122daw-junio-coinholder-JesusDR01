import { StyledTransactionDrawer } from './TransactionDrawer.styled';
import { Box, Pagination } from '@mui/material';
import { TransactionCard } from 'components/TransactionCard/Transaction';
import { TransactionActions } from 'components/TransactionActions/TransactionActions';
import { useGetCoin } from 'hooks/coin/useGetCoin';
import { useEffect, useState } from 'react';

export function TransactionDrawer({ open, toggleDrawer, transactions, children }) {
  const { idCoin } = useGetCoin();
  function createData({ type, investment, entryPrice, _id: id, notes, disabled }) {
    const parsedEntryPrice = `${entryPrice.toFixed(3)}$`;
    const volume = `${(investment * entryPrice).toFixed(3)}$`;
    const parsedType = type === 'buy' ? '+' : '-';
    return {
      parsedData: {
        parsedType,
        investment,
        parsedEntryPrice,
        volume,
      },
      rawTransactionData: { id, disabled, notes, entryPrice, investment, type },
    };
  }

  const transactionsData = transactions.map((transaction) => createData(transaction));

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(2);
  const handleChange = (_e, value) => {
    setPage(value);
  };
  const count = Math.round(transactionsData?.length / rowsPerPage);
  const shownData = transactionsData.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage,
  );
  useEffect(() => {
    if (shownData.length === 0 && page > 1) {
      setPage((page) => page - 1);
    }
  }, [shownData]);
  const shownTransactions = transactionsData.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage,
  );
  // console.log(shownData);
  return (
    <StyledTransactionDrawer
    id="transaction-drawer"
      anchor="bottom"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
    >
      {open && (
        <Box className="drawer-back-wrapper">
          <Box className="puller" />
        </Box>
      )}
      {children}
      <TransactionActions idCoin={idCoin} />
      <Box className="transactions-wrapper">
        {shownTransactions.map((transaction, index) => (
          <TransactionCard transaction={transaction} key={index} />
        ))}
      </Box>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        variant="outlined"
        color="primary"
        id="transactions-pagination"
      />
    </StyledTransactionDrawer>
  );
}
