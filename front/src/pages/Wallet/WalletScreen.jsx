//@ts-check
import Transfer from '../../components/Transfer/Transfer';
import Address from '../../components/Address/Address';
import Blockie from '../../components/Blockie/Blockie';
import React from 'react';
import { StyledWallet } from './Wallet.styled';
import { Box } from '@mui/material';

export const WalletScreen = () => {
  return (
    <StyledWallet
      id="wallet-screen"
      className="animate__animated animate__fadeIn"
      title={
        <Box className="wallet-card-content">
          <Blockie scale={5} avatar currentWallet style />
          <Address size="6" copyable />
        </Box>
      }
    >
      <Transfer />
    </StyledWallet>
  );
};
