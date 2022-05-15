import { useCreatePortfolioMutation } from 'app/services/portfolios';
import { useState } from 'react';

export const useCreatePortfolio = () => {
  const [createPortfolio, { data: newPortfolio, isLoading: isCreatingPortfolio, error: errorCreatingPortfolio }] =
    useCreatePortfolioMutation();
  const createPortfolioModalState = useState(false);
  const [, setOpenCreatePortfolioModal] = createPortfolioModalState;
    const handleOpenCreatePortfolioModal = () =>{
        setOpenCreatePortfolioModal(true);
    }
    const handleCreatePortfolio = (values) =>{
        // console.log(values);
        createPortfolio(values);
        setOpenCreatePortfolioModal(false);
    }
  return {
    createPortfolioModalState,
    handleOpenCreatePortfolioModal,
    createPortfolio, 
    isCreatingPortfolio,
    handleCreatePortfolio,
    errorCreatingPortfolio
  };
};
