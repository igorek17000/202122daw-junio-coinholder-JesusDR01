import styled from 'styled-components';
import { Menu } from 'antd';

export const StyledChainsMenu = styled(Menu)`
  overflow-y: auto;
  max-height: 26vh !important;

  .item-value {
    margin-left: 5px;
  }
  .item {
    display: flex;
    align-items: center;
    height: 42px;
    font-weight: 500;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    padding: 0 10px;
  }
`;
