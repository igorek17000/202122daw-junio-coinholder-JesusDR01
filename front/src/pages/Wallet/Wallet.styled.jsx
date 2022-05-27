import styled from 'styled-components';

import { Card } from 'antd';

export const StyledWallet = styled(Card)`
  box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
  border: 1px solid #e7eaf3;
  border-radius: 1rem;
  width: 90%;

  font-size: 16px;
  font-weight: 500;

  .wallet-card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
  @media (min-width: 768px) {
    width: 450px;
  }
`;
