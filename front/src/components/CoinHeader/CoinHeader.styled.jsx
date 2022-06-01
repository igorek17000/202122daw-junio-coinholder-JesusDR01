import { Box } from '@mui/material';
import styled from 'styled-components';

export const StyledCoinHeader = styled(Box)`
  flex: 1;
  position: relative;
  padding-bottom: 20px;
  p{
    margin-left: 7.5px;
  }
  &.disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  .logo-wrapper {
    display: flex;
    align-items: center;
    .logo {
      width: 20px;
      height: 20px;
    }
  }
  .coin-data-wrapper {
    display: flex;
    align-items: center;
    text-align: center;
    p,
    span {
      font-size: 0.8rem;
    }
    .investment {
      margin-right: 5px;
    }
    .investment ~ span {
      display: inline-block;
    }
    div:first-child {
      flex: 2;
    }

    div:last-child {
      flex: 1;
    }
  }
  @media screen and (min-width: 600px) {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    .coin-data-wrapper {
      display: flex;
      flex: 1;
      text-align: right;
      justify-content: space-around;
      text-align: center;
      div {
        p,
        span {
          font-size: 1rem;
        }
      }
      div:first-child {
        width: 25%;
      }
    }
  }
`;
