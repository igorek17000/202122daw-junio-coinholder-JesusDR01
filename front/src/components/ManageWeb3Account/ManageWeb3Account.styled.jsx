import styled from 'styled-components';

import { Modal } from 'antd';

export const StyledManageWeb3AccountModal = styled(Modal)`
  width: 400px;
  font-size: 16px;
  font-weight: 500;
  .ant-modal-body {
    padding: 15px;
    font-size: 17px;
    font-weight: 500;
  }

  #account-address {
    margin-top: 10px;
    border-radius: 1rem;
    .ant-card-body {
      padding: 15px;
    }
    #account-explorer {
      margin-top: 10px;
      padding: 0 10px;
      #select-icon {
        margin-right: 5px;
      }
    }
  }

  #disconnect {
    width: 100%;
    margin-top: 10px;
    border-radius: 0.5rem;
    font-size: 16px;
    font-weight: 500;
  }
`;
