import styled from 'styled-components';

export const StyledBalances = styled.div`
  width: 65vw;
  padding: 15px;
  height: 80vh;
  margin-bottom: 20px;
   .ant-card-bordered{
      transform:scale(0.9);
  }
  .ant-table{
    transform: scale(0.96);
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
`;
