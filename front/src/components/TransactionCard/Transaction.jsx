//@ts-check
import React, { useState } from 'react';
import { StyledTransaction } from './Transaction.styled';
import { Box } from '@mui/material';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import NoteIcon from '@mui/icons-material/Note';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useDeleteTransaction } from 'hooks/transaction/useDeleteTransaction';
import { useUpdateTransaction } from 'hooks/transaction/useUpdateTransaction';
import { useDisableTransaction } from 'hooks/transaction/useDisableTransaction';
import TransactionModals from 'components/TransactionModals';
import { useTranslation } from 'react-i18next';
import { motion, useAnimation, usePresence } from 'framer-motion';
export function TransactionCard({ transaction }) {
  const { parsedData, rawTransactionData } = transaction;

  const { t } = useTranslation();
  const useDeleteTransactionHook = useDeleteTransaction();
  const { handleOpenDeleteTransactionModal } = useDeleteTransactionHook;

  const useUpdateTransactionHook = useUpdateTransaction({ id: rawTransactionData.id });

  const { handleOpenUpdateTransactionModal } = useUpdateTransactionHook;

  const { handleDisableTransaction } = useDisableTransaction({ id: rawTransactionData.id });

  const notesTransactionModalState = useState(false);

  return (
    <StyledTransaction
      component={motion.div}
      animate={{ opacity: 1, x:0}}
      initial={{ opacity: 0, x:-100 }}
      transition={{ duration: 0.3 }}
      className="transaction-card"
      // @ts-ignore
      transaction={rawTransactionData}
      key={rawTransactionData.id}
    >
      <Box className="transaction-type">
        <span>{parsedData.parsedType}</span>
      </Box>
      <Box className="transaction-data-wrapper">
        <Box>
          <p>{t('transactions.investment')}</p>
          <p>{parsedData.investment}</p>
        </Box>
        <Box>
          <p>{t('transactions.entryPrice')}</p>
          <p>{parsedData.parsedEntryPrice}</p>
        </Box>
        <Box>
          <p>{t('transactions.volume')}</p>
          <p>{parsedData.volume}</p>
        </Box>
      </Box>

      <BottomNavigation showLabels className="actions">
        <BottomNavigationAction
          label={t('transactions.actions.delete')}
          icon={<DeleteIcon />}
          onClick={() => handleOpenDeleteTransactionModal(rawTransactionData.id)}
        />
        <BottomNavigationAction
          label={t('transactions.actions.edit')}
          icon={<EditIcon />}
          onClick={() => handleOpenUpdateTransactionModal()}
        />
        {rawTransactionData.disabled ? (
          <BottomNavigationAction
            label={t('transactions.actions.showMoney')}
            icon={<AttachMoneyIcon />}
            onClick={() => handleDisableTransaction(rawTransactionData)}
          />
        ) : (
          <BottomNavigationAction
            label={t('transactions.actions.disable')}
            icon={<MoneyOffIcon />}
            onClick={() => handleDisableTransaction(rawTransactionData)}
          />
        )}
        <BottomNavigationAction
          className="add-note"
          label={t('transactions.actions.showNote')}
          disabled={!rawTransactionData.notes}
          icon={<NoteIcon />}
          onClick={() => notesTransactionModalState[1](true)}
        />
      </BottomNavigation>

      <TransactionModals
        row={rawTransactionData}
        transaction={rawTransactionData}
        hooks={{
          useDeleteTransaction: useDeleteTransactionHook,
          useUpdateTransaction: useUpdateTransactionHook,
          notesTransactionModalState: notesTransactionModalState,
        }}
      />
    </StyledTransaction>
  );
}
