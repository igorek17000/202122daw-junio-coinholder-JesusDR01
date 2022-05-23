import { Box } from '@mui/material';
import styled from 'styled-components';
export const StyledWalletImportScreen = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
  height: 70vh;
  padding: 17px;
  #info {
    margin-bottom: 15px;
    article {
      font-size: 0.6rem;
    }
  }
  button[type="submit"] {
    background-color: #57ffff;
    &:hover {
      background-color: #00e0e0;
    }
    color: black;
    font-weight: bold;
  }
  #back{
    align-self: flex-start;
  }
`;
