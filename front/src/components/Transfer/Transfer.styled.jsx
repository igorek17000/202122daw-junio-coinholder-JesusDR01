import styled from 'styled-components';
import { Box } from '@mui/material';

export const StyledTransfer = styled(Box)`
  align-items: center;
  width: 100%;
  #title {
    text-align: center;
  }
  .input-wrapper {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }
  label {
    max-width: 80px;
    width: 100%;
  }
  #transfer-btn {
    width: 100%;
    margin-top: 25px;
  }
`;
