import styled from 'styled-components';
import Modal from '@mui/material//Modal';

export const StyledGenericModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;

  #modal-content {
    width: 90%;
    background-color: white;
    padding: 20px;
    position: relative;
    #close-icon {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  button[type='submit'] {
    background-color: #57ffff;
    &:hover {
      background-color: #00e0e0;
    }
    color: black;
    font-weight: bold;
    height: 38px;
  }

  #success {
    text-align: center;
    #success-img {
      width: 100%;
      margin: 10px auto;
      height: 65px;
      img {
        width: initial;
      }
    }
    article {
      margin: 10px;
    }
  }
`;
