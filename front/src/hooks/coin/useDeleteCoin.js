import { useDeleteCoinMutation } from 'app/services/coins';
import { useState } from 'react';
export const useDeleteCoin = () => {
  const [deleteCoin, { isLoading: isDeletingCoin, error: errorDeletingCoin }] = useDeleteCoinMutation();
  const deleteCoinModalState = useState(false);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [, setOpenDeleteCoinModal] = deleteCoinModalState;
  const handleOpenDeleteCoinModal = (idCoin) => {
    setSelectedCoin(idCoin);
    setOpenDeleteCoinModal(true);
  };
  const handleDeleteCoin = () => {
    deleteCoin({id: selectedCoin});
    setOpenDeleteCoinModal(false);
  };
  const handleCloseDeleteCoinModal = () => {
    setOpenDeleteCoinModal(false);
    };
  return {
    deleteCoinModalState,
    handleOpenDeleteCoinModal,
    isDeletingCoin,
    handleDeleteCoin,
    handleCloseDeleteCoinModal,
    errorDeletingCoin
  };
};
