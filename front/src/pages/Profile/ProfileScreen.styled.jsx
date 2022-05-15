import styled from 'styled-components';

import { Box } from '@mui/material';

export const StyledProfile = styled(Box)`
  min-width: 70%;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  margin: 20px;
  #data {
    padding: 40px;
    h2 {
      font-weight: bold;
    }
  }
  #actions {
    text-align: center;
    button {
      margin: 5px;
    }
  }
  button {
    background-color: #57ffff;
    &:hover {
      background-color: #00e0e0;
    }
    color: black;
    font-weight: bold;
    height: 38px;
  }
`;
