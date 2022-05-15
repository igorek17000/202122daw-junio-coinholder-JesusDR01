import { Box } from '@mui/material';

import styled from 'styled-components';

export const StyledAccount = styled(Box)`
  color: #21bf96;

  #account {
    height: 37px;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    border-radius: 12px;
    background-color: rgb(244, 244, 244);
    cursor: pointer;

    p {
      margin-right: 5px;
      margin-bottom: 0;
    }
  }
`;
