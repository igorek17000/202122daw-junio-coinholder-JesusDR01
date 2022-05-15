import { Container } from '@mui/material';
import styled from 'styled-components';
export const LoginWrapper = styled(Container)`
  #avatar {
    margin: 10px;
    background-color: #9c27b0;
  }
  button[type='submit'] {
    margin: 10px 0px;
    background-color: #57ffff;
    &:hover {
      background-color: #00e0e0;
    }
    color: black;
    font-weight: bold;
  }

  & {
    margin-top: 80px;
    height: 90vh;
    flex-direction: column;
    align-items: center;
    display: flex !important;
  }
  .strike {
    display: block;
    text-align: center;
    white-space: nowrap;
  }

  .strike > span {
    width: 100%;
    position: relative;
    display: inline-block;
  }

  .strike > span:before,
  .strike > span:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 48%;
    border: 1px solid #1976d2;
  }

  .strike > span:before {
    right: 50%;
    margin-right: 15px;
  }

  .strike > span:after {
    left: 50%;
    margin-left: 15px;
  }

  .social {
    display: flex;
    color: white;
    a {
      padding: 3px;
      display: inline-block;
      margin: 10px;
      svg {
        color: white;
        width: 50px;
        vertical-align: middle;
        height: 50px;
      }
    }
  }

  .social i {
  }

  #facebook {
    background: #3b5998;
  }

  #twitter {
    background: #55acee;
  }

  #google {
    background: #dd4b39;
  }

  #github {
    background: #444444;
  }
`;
