import styled from 'styled-components';

export const StyledInchModal = styled.div`
  overflow: auto;
  height: 500px;
  .token {
    padding: 5px 20px;
    margin: 0px 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    img{
        height: 32px;
        width: 32px;
        margin-right: 20px;
    }
    span{
        font-size: 15px;
        font-weight: 500;
        line-height: 14px;
    }
  }
`;
