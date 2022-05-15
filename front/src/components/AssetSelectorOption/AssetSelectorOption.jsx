import { Box } from '@mui/material';
import { Image } from 'antd';
import React from 'react';
import { useMoralis } from 'react-moralis';
import { StyledAssetSelectorOption } from './AssetSelectorOption.styled';

export const AssetSelectorOption = ({ item }) => {
  const { Moralis } = useMoralis();

  return (
    <StyledAssetSelectorOption>
      <Image
        src={item.logo || 'https://etherscan.io/images/main/empty-token.png'}
        alt="nologo"
        preview={false}
      />
      <Box className="asset-item">
        <p>{item.symbol}</p>
        <p >
          {item.balance > 0
            ? parseFloat(Moralis?.Units?.FromWei(item.balance, item.decimals))
            : parseFloat(Moralis?.Units?.FromWei(item.balance, item.decimals))?.toFixed(6)}
        </p>
      </Box>
    </StyledAssetSelectorOption>
  );
};
