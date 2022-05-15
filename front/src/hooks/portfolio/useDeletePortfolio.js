import { useDeletePortfolioMutation } from 'app/services/portfolios';
import { useState } from 'react';
export const useDeletePortfolio = () => {
  const [deletePortfolio, { isLoading: isDeletingPortfolio, error: errorDeletingPortfolio }] = useDeletePortfolioMutation();
  const deletePortfolioModalState = useState(false);
  const [, setOpenDeletePortfolioModal] = deletePortfolioModalState;
  const handleOpenDeletePortfolioModal = () => {
    setOpenDeletePortfolioModal(true);
  };
  const handleDeletePortfolio = (idPortfolio) => {
    // console.log(idPortfolio);
    deletePortfolio({id: idPortfolio});
    setOpenDeletePortfolioModal(false);
  };
  const handleCloseDeletePortfolioModal = () => {
    setOpenDeletePortfolioModal(false);
    };
  return {
    deletePortfolioModalState,
    handleOpenDeletePortfolioModal,
    isDeletingPortfolio,
    handleDeletePortfolio,
    handleCloseDeletePortfolioModal,
    errorDeletingPortfolio
  };
};
