import { Container } from '@mui/material';
import styled from 'styled-components';

export const SignUpWrapper = styled(Container)`
  & {
    margin-top: 80px;
    height: 90vh;
    flex-direction: column;
    align-items: center;
    display: flex !important;

    button[type='submit'] {
      margin: 10px 0px;
      background-color: #57ffff;
      &:hover {
        background-color: #00e0e0;
      }
      color: black;
      font-weight: bold;
    }

    #lock{
      background-color: #9c27b0;
      margin:5px;
    }
    #form-wrapper{
      margin-top: 20px;
    }
  }
`;
