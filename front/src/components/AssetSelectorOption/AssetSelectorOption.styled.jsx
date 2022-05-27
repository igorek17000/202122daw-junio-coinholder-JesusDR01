import { Box } from '@mui/material';
import styled from 'styled-components';

export const StyledAssetSelectorOption = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;

  img {
    width: 24px;
    height: 24px;
    border-radius: 15px;
  }
  .asset-item {
    display: flex;
    justify-content: space-between;
    width: 90%;
    height: 35px;
    p {
      margin: 0;
    }
  }
`;
