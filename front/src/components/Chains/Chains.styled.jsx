import styled from 'styled-components';

import { Box } from '@mui/material';

export const StyledChains = styled(Box)`
  #chain-selector {
    border: 2px solid rgb(231, 234, 243);
    border-radius: 12px;
  }
  .item-value {
    margin-left: 5px;
  }
  .item {
    display: flex;
    align-items: center;
    height: 42px;
    font-weight: 500;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    padding: 0 10px;
  }
`;
