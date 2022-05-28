//@ts-check
import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import { StyledTransaction } from './Transaction.styled';
import { Box, Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ActionsMenu } from '../ActionsMenu/ActionsMenu';

import { useDeleteTransaction } from 'hooks/transaction/useDeleteTransaction';
import { useUpdateTransaction } from 'hooks/transaction/useUpdateTransaction';
import { useDisableTransaction } from 'hooks/transaction/useDisableTransaction';

import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import NoteIcon from '@mui/icons-material/Note';
import { TransactionModals } from '../TransactionModals/TransactionModals';
import { motion, useAnimation, usePresence } from 'framer-motion';

export function TransactionRow({ row, transaction }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const useDeleteTransactionHook = useDeleteTransaction();
  const { handleOpenDeleteTransactionModal, isDeletingTransaction } = useDeleteTransactionHook;

  const useUpdateTransactionHook = useUpdateTransaction({ id: row.id });

  const { handleOpenUpdateTransactionModal } = useUpdateTransactionHook;

  const { handleDisableTransaction } = useDisableTransaction({ id: row.id });

  const notesTransactionModalState = useState(false);



  return (
    <StyledTransaction
      // @ts-ignore
      component={motion.tr}
      animate={{ opacity: 1, x:0 }}
      initial={{ opacity: 0, x:-100 }}
      transition={{ duration: 0.3}}
      row={row}
      key={row.id}
      disabled={transaction.disabled}
      notes={transaction.notes}
    >
      <TableCell className="transaction-type">
        <span>{row.type}</span>
      </TableCell>
      <TableCell align="right">{row.investment}</TableCell>
      <TableCell align="right">{row.entryPrice}</TableCell>
      <TableCell align="right">{row.volume}</TableCell>
      <TableCell align="center" className="actions">
        <>
          <Box className="notifications">
            <MoneyOffIcon className="disabled" />
            <NoteIcon className="notes" />
          </Box>

          <Button
            variant="outlined"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </Button>
          <ActionsMenu
            anchorEl={anchorEl}
            open={open}
            handleClose={handleClose}
            transaction={transaction}
            actionHandlers={{
              handleOpenDeleteModal: handleOpenDeleteTransactionModal,
              handleOpenNotesModal: notesTransactionModalState[1],
              handleOpenUpdateModal: handleOpenUpdateTransactionModal,
              handleDisableTransaction: handleDisableTransaction,
            }}
          />
        </>
      </TableCell>

      <TransactionModals
        row={row}
        transaction={transaction}
        hooks={{
          useDeleteTransaction: useDeleteTransactionHook,
          useUpdateTransaction: useUpdateTransactionHook,
          notesTransactionModalState: notesTransactionModalState,
        }}
      />
    </StyledTransaction>
  );
}
