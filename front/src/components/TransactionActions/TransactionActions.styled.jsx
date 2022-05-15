import { Box } from '@mui/material';
import styled from 'styled-components';

export const StyledTransactionActions = styled(Box)`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 5px;
  .btn-styled {
    background-color: #57ffff;
    &:hover{
      background-color: #00e0e0;
    }
    color: black;
    font-weight: bold;
    height: 38px;
  }

  @media screen and (min-width: 600px) {
    justify-content: flex-end;
    button {
      margin-bottom: 10px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
`;
