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

export function TransactionCard({ data, transaction }) {
  const { t } = useTranslation();
  const useDeleteTransactionHook = useDeleteTransaction();
  const { handleOpenDeleteTransactionModal } = useDeleteTransactionHook;

  const useUpdateTransactionHook = useUpdateTransaction({ id: data.id });

  const { handleOpenUpdateTransactionModal } = useUpdateTransactionHook;

  const { handleDisableTransaction } = useDisableTransaction({ id: data.id });

  const notesTransactionModalState = useState(false);

  return (
    <StyledTransaction
      // @ts-ignore
      transaction={data}
      key={data.id}
    >
      <Box className="transaction-type">
        <span>{data.type}</span>
      </Box>
      <Box className="transaction-data-wrapper">
        <Box>
          <p>{t('transactions.investment')}</p>
          <p>{data.investment}</p>
        </Box>
        <Box>
          <p>{t('transactions.entryPrice')}</p>
          <p>{data.entryPrice}</p>
        </Box>
        <Box>
          <p>{t('transactions.volume')}</p>
          <p>{data.volume}</p>
        </Box>
      </Box>

      <BottomNavigation showLabels className="actions">
        <BottomNavigationAction
          label={t('transactions.actions.delete')}
          icon={<DeleteIcon />}
          onClick={() => handleOpenDeleteTransactionModal(data.id)}
        />
        <BottomNavigationAction
          label={t('transactions.actions.edit')}
          icon={<EditIcon />}
          onClick={() => handleOpenUpdateTransactionModal()}
        />
        {transaction.disabled ? (
          <BottomNavigationAction
            label={t('transactions.actions.showMoney')}
            icon={<AttachMoneyIcon />}
            onClick={() => handleDisableTransaction(transaction)}
          />
        ) : (
          <BottomNavigationAction
            label={t('transactions.actions.disable')}
            icon={<MoneyOffIcon />}
            onClick={() => handleDisableTransaction(transaction)}
          />
        )}
        <BottomNavigationAction
          className="add-note"
          label={t('transactions.actions.showNote')}
          disabled={!transaction.notes}
          icon={<NoteIcon />}
          onClick={() => notesTransactionModalState[1](true)}
        />
      </BottomNavigation>

      <TransactionModals
        row={data}
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
