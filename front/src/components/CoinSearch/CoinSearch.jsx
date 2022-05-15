import { Box, Input } from '@mui/material';
import { useSearchCoinsQuery } from 'app/coingeckoAPI/coingeckoAPI';
import CoinSearchCard from 'components/CoinSearchCard';
import { Loader } from 'components/Loader/Loader';
import React, { useEffect,  useState } from 'react';
import { StyledCoinSearch } from './CoinSearch.styled';
import SearchIcon from '@mui/icons-material/Search';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';

export const CoinSearch = ({ handleCreateCoin }) => {
  const {t} = useTranslation();
  const { isLoading, data } = useSearchCoinsQuery();
  const [filteredCoins, setFilteredCoins] = useState(data?.coins?.slice(0, 20));

  useEffect(() => {
    if (data) {
      setFilteredCoins(data.coins.slice(0, 20));
    }
  }, [data]);

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setFilteredCoins(
      data?.coins
        ?.filter(
          (coin) =>
            coin.name.toLowerCase().includes(searchValue) ||
            coin.symbol.toLowerCase().includes(searchValue),
        )
        .slice(0, 20),
    );
  };
  
  return (
    <StyledCoinSearch>
      {isLoading ? (
        <Loader minHeight="60vh" />
      ) : (
        <Box id="coins">
          <Input
            id="search"
            autoComplete="off"
            onKeyUp={handleFilter}
            placeholder={t('coins.actions.search')}
            endAdornment={<SearchIcon />}
          />
          {isLoading ? (
            <Loader minHeight="60vh" />
          ) : filteredCoins?.length > 0 ? (
            filteredCoins?.map((coin, i) => (
              <CoinSearchCard
                key={i}
                data={coin}
                handleCreateCoin={handleCreateCoin}
              />
            ))
          ) : (
            <Typography id="not-found">{t('coins.actions.searchNotFound')}</Typography>
          )}
        </Box>
      )}
    </StyledCoinSearch>
  );
};
