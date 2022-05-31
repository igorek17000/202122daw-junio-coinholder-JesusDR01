import styled from 'styled-components';

import { Box } from '@mui/material';

export const StyledPortfolio = styled(Box)`
  #no-coins{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
    border-radius: 20px;
    margin: 20px;
    padding: 20px;
    button{
      font-size:1rem;
      background-color: #57ffff;
    &:hover{
      background-color: #00e0e0;
    }
    color: black;
    font-weight: bold;
    }
    h2{
      font-size:1.4rem;
    }
  }
`;
