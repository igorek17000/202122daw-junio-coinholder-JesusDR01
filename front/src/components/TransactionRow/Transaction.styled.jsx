import TableRow from '@mui/material/TableRow';

import styled from 'styled-components';

export const StyledTransaction = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  }

  .transaction-type {
    font-size: 3rem;
    padding: 0;
    padding-left: 6px;
    text-align: center;
    span {
      color: ${({ row }) => (row.type === '+' ? '#98de98' : 'red')};
      /* padding: 0; */
    }
  }

  .actions {
    position: relative;
    width: 130px;
    .notifications {
      display: flex;
      position: absolute;
      top: 10px;
      right: 25px;
      .disabled,
      .notes {
        margin: 0 3px;
        z-index: 1;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        color: white;
      }
      .disabled {
        display: ${({ disabled }) => !disabled && 'none'};
        background: ${({ disabled }) => disabled && 'red'};
      }
      .notes {
        display: ${({ notes }) => !notes && 'none'};
        background: ${({ notes }) => notes && 'purple'};
        padding: 2px;
      }
    }
  }
`;
