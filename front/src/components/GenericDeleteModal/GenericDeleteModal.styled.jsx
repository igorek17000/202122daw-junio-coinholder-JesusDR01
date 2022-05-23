import styled from 'styled-components';

import { Box } from '@mui/material';

export const StyledGenericDeleteModal = styled(Box)`
  display: flex;
  flex-direction: column;
  h2 {
    text-align: center;
    font-size: 1.6rem;
  }
  #actions {
    margin: 10px;
    display: flex;
    justify-content: center;
    button {
      margin: 0px 5px;
    }
  }
`;
