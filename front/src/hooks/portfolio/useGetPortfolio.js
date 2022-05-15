import { selectCurrentPortfolio } from 'features/portfolios/portfoliosSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useGetPortfolio = () => {
  const idPortfolio = useSelector(selectCurrentPortfolio);
  return useMemo(() => ({ idPortfolio }), [idPortfolio]);
};
