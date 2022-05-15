import i18n from 'helpers/i18n';
import styled from 'styled-components';

export const StyledTransfersScreen = styled.div`
  overflow-y: auto;
  height: 80vh;
  width: 65vw;
  padding: 15px;
  margin-bottom: 20px;
  .ant-card-bordered {
    transform: scale(0.9);
  }
  .ant-table {
    transform: scale(0.96);
  }

  .ant-select-selector,
  .ant-select-arrow {
    display: none;
  }
  .ant-card-body div div{
    flex-wrap: wrap;
    div{
      width: initial !important;
      padding-right: initial !important;
      text-align: left !important;
      padding-left: initial !important;
    }
  }
  
  @media screen and (min-width: 1200px) {
    height: 90vh;
    .ant-table-content {
      overflow-y: auto;
      height: 72vh;
    }
  }
`;
