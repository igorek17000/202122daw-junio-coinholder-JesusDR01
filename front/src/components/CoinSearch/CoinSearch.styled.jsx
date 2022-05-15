import styled from 'styled-components';

import { Box } from '@mui/material';

export const StyledCoinSearch = styled(Box)`
  #coins {
    overflow-y: auto;
    height: 50vh;
    display: flex;
    flex-direction: column;
    .MuiInput-root {
      margin: 0 auto;
    }
    #not-found{
        margin:  auto;
        font-size: 1.3rem;
    }
  }
`;
