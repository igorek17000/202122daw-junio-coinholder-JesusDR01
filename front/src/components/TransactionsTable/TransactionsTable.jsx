import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { StyledTransactionsTable } from './TransactionsTable.styled';
import { TransactionRow } from '../TransactionRow/Transaction';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
function createData({ type, investment, entryPrice, _id: id, notes }) {
  const parsedEntryPrice = `${entryPrice.toFixed(3)}$`;
  const volume = `${(investment * entryPrice).toFixed(3)}$`;
  const parsedType = type === 'buy' ? '+' : '-';
  return { type: parsedType, investment, entryPrice: parsedEntryPrice, volume, id, notes };
}

export const TransactionsTable = ({ transactions }) => {
  const { t } = useTranslation();
  const rows = transactions.map((transaction) => createData(transaction));
  const total = rows.length;
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { id: 'type', label: '', minWidth: 10 },
    { id: 'amount', label: t('transactions.table.amount'), align: 'right', minWidth: 10 },
    {
      id: 'coinPrice',
      label: t('transactions.table.coinPrice'),
      minWidth: 10,
      align: 'right',
    },
    {
      id: 'volume',
      label: t('transactions.table.volume'),
      minWidth: 10,
      align: 'right',
    },
    {
      id: 'actions',
      label: '',
      minWidth: 2,
      align: 'right',
    },
  ];

  return (
    <StyledTransactionsTable id="transactions-table" component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <AnimatePresence >
            {(
              rowsPerPage > 0 && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ).map((row, i) => (
              <TransactionRow
                row={row}
                transaction={transactions[i + page * rowsPerPage]}
                key={row.id}
              />
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
      <TablePagination
        labelRowsPerPage={t('transactions.table.rowsPerPage')}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} ${t('transactions.table.conjunction')} ${count}`
        }
        rowsPerPageOptions={[2, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </StyledTransactionsTable>
  );
};
