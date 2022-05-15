import { selectCurrentCoin,  } from 'features/coins/coinsSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useGetCoin = () => {
  const idCoin = useSelector(selectCurrentCoin);
  return useMemo(() => ({ idCoin }), [idCoin]);
};
