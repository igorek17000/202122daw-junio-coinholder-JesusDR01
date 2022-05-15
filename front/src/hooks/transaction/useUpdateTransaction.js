import { useUpdateTransactionMutation } from 'app/services/transactions';
import { useState } from 'react';

export const useUpdateTransaction = ({id}) => {
  const [updateTransaction, { data: newTransaction, isLoading: isUpdatingTransaction, error: errorUpdatingTransaction }] =
    useUpdateTransactionMutation();
  const updateTransactionModalState = useState(false);
  const [, setOpenUpdateTransactionModal] = updateTransactionModalState;
  const handleOpenUpdateTransactionModal = () => {
    setOpenUpdateTransactionModal(true);
  };
  const handleUpdateTransaction = (values) => {
    // console.log(values);
    updateTransaction({id: id, ...values});
    setOpenUpdateTransactionModal(false);
  };
  return {
    updateTransactionModalState,
    handleOpenUpdateTransactionModal,
    updateTransaction,
    isUpdatingTransaction,
    handleUpdateTransaction,
    errorUpdatingTransaction
  };
};
