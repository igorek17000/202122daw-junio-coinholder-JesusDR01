import { Container } from '@mui/material';
import styled from 'styled-components';
export const StyledForgotPassword = styled(Container)`

  button[type='submit'] {
    margin: 10px 0px;
    background-color: #57ffff;
    &:hover {
      background-color: #00e0e0;
    }
    color: black;
    font-weight: bold;
  }
  h1{
    margin: 20px;
  }
  & {
    margin-top: 80px;
    height: 60vh;
    flex-direction: column;
    align-items: center;
    display: flex !important;
  }

  #lock{
      background-color: #9c27b0;
      margin:5px;
    }
`;
