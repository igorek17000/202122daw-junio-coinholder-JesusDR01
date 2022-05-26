
import styled from 'styled-components';
import {Box} from '@mui/material'
export const StyledTransaction = styled(Box)`
background-color: #f0f2f5;
padding: 10px;
margin: 10px;
border-radius: 10px;
  &:last-child td,
  &:last-child th {
    border: 0;
  }

  .transaction-type {
    font-size: 3rem;
    padding: 0;
    padding-left: 6px;
    span {
      color: ${({ transaction }) => (transaction.type === 'buy' ? '#98de98' : 'red')};
      /* padding: 0; */
    }
  }
  .transaction-data-wrapper{
    display:flex;
    justify-content: space-around;
  }
  .actions{
    background: #f0f2f5;
    .add-note {
      &:disabled{
        opacity: 0.5;
      }
    }
  }
`;
