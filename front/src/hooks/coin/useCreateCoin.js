import { useCreateCoinMutation } from 'app/services/coins';

export const useCreateCoin = (idPortfolio, setOpenCreateCoinModal) => {
  const [createCoin, { data: newCoin, isLoading: isCreatingCoin, error: errorCreatingCoin }] = useCreateCoinMutation();

  const handleCreateCoin = (coin) => {
    // console.log(coin);
    createCoin({
      idCoingecko: coin.id,
      idPortfolio,
      image: coin.large,
      name: coin.name,
      symbol: coin.symbol,
    });
    setOpenCreateCoinModal(false);
  };
  return {
    isCreatingCoin,
    handleCreateCoin,
    errorCreatingCoin
  };
};
