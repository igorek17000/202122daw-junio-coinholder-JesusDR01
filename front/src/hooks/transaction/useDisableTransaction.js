import { useUpdateTransactionMutation } from 'app/services/transactions';
import { useState } from 'react';

export const useDisableTransaction = ({id}) => {
  const [updateTransaction, { data: newTransaction, isLoading: isDisablingTransaction, error: errorDisablingTransaction }] = useUpdateTransactionMutation();
  const handleDisableTransaction = (transaction) => {
    updateTransaction({id: id, disabled: !transaction.disabled});
  };
  return {
    handleDisableTransaction,
    errorDisablingTransaction
  };
};
