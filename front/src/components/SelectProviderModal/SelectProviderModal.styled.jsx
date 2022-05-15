import styled from 'styled-components';

import { Modal } from 'antd';

export const StyledSelectProviderModal = styled(Modal)`
  font-size: 16px;
  font-weight: 500;
  width: 340px;
  h2 {
    text-align: center;
  }

  .ant-modal-body {
    padding: 15px;
    font-size: 17px;
    font-weight: 500;
  }

  #providers-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .connector {
      align-items: center;
      display: flex;
      flex-direction: column;
      height: auto;
      justify-content: center;
      margin-left: auto;
      margin-right: auto;
      padding: 20px 5px;
      cursor: pointer;
      .connector-icon {
        align-self: center;
        fill: rgb(40, 13, 95);
        flex-shrink: 0;
        margin-bottom: 8px;
        height: 30px;
      }
    }
  }
`;
