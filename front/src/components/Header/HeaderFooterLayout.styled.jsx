import styled from 'styled-components';
import { Layout } from 'antd';
const { Header } = Layout;

export const StyledHeader = styled(Header)`
  position: fixed;
  z-index: 1;
  background: #fff;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 !important;
  border-bottom: 2px solid rgba(0, 0, 0, 0.06);
  font-family: Roboto, sans-serif;
  box-shadow: 0 1px 10px rgb(151 164 175 / 10%);
  #management {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  img {
    display: block;
  }
`;
