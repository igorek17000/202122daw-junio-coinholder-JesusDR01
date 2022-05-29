import styled from 'styled-components';
import { Menu } from 'antd';

export const StyledNav = styled(Menu)`
  display: flex;
  font-size: 17px;
  font-weight: 500;
  width: 82%;
  min-width: 12%;
  justify-content: center;
  border-bottom: none;
  .ant-menu-vertical {
    padding: 10px;
  }

  .ant-menu-submenu {
    text-align: center;
    padding: 0px !important;
    width: 100%;
    
    svg {
      font-size: 1.5rem;
      vertical-align: middle;
    }
    @media screen and (min-width: 485px) {
      width: 25px;
    }
  }
`;
