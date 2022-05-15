import { useCreateTransactionMutation } from 'app/services/transactions';
import { useState } from 'react';

export const useCreateTransaction = ({idCoin}) => {
  const [createTransaction, { data: newTransaction, isLoading: isCreatingTransaction, error : errorCreatingTransaction }] =
    useCreateTransactionMutation();
  const createTransactionModalState = useState(false);
  const [type, setType] = useState('');
  const [, setOpenCreateTransactionModal] = createTransactionModalState;
  const handleOpenCreateTransactionModal = (type) => {
    setType(type);
    setOpenCreateTransactionModal(true);
  };
  const handleCreateTransaction = (values) => {
    // console.log(values);
    // console.log(type)
    createTransaction({...values, type, idCoin});
    setOpenCreateTransactionModal(false);
  };
  return {
    createTransactionModalState,
    handleOpenCreateTransactionModal,
    createTransaction,
    isCreatingTransaction,
    handleCreateTransaction,
    errorCreatingTransaction
  };
};
