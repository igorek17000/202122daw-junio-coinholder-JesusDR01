import styled from 'styled-components';
import { Layout } from 'antd';

export const StyledGenericLayout = styled(Layout)`
  min-height: 91vh;
  margin: auto;
  justify-content: ${({ isMobile }) => (isMobile ? 'start' : 'center')};
  align-items: center;
  display: flex;
`;
