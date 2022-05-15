import { useDeleteTransactionMutation } from 'app/services/transactions';
import { useState } from 'react';
export const useDeleteTransaction = () => {
  const [deleteTransaction, { isLoading: isDeletingTransaction, error: errorDeletingTransaction }] = useDeleteTransactionMutation();
  const deleteTransactionModalState = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState('');
  const [open, setOpenDeleteTransactionModal] = deleteTransactionModalState;
  // console.log(open, 'open');
  const handleOpenDeleteTransactionModal = (idTransaction) => {
    setSelectedTransaction(idTransaction);
    setOpenDeleteTransactionModal(true);
  };
  const handleDeleteTransaction = () => {
    deleteTransaction({id: selectedTransaction});
    setOpenDeleteTransactionModal(false);
  };
  const handleCloseDeleteTransactionModal = () => {
    setOpenDeleteTransactionModal(false);
    };
  return {
    deleteTransactionModalState,
    handleOpenDeleteTransactionModal,
    isDeletingTransaction,
    handleDeleteTransaction,
    handleCloseDeleteTransactionModal,
    errorDeletingTransaction
  };
};
