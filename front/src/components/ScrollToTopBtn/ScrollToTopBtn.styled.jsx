import styled from 'styled-components';

import { Box } from '@mui/material';

export const StyledScrollToTopBtn = styled(Box)`
  span svg {
    z-index: 2;
    position: fixed;
    bottom: 30px;
    left: 30px;
    width: 11vw;
    max-width: 34px;
    height: 11vw;
    max-height: 34px;
    background-color: #57ffff;
    color: black;
    border-radius: 50%;
    &:hover {
      background-color: #00e0e0;
    }
  }
`;
