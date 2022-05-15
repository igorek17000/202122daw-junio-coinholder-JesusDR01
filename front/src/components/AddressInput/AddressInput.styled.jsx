import { Input } from 'antd';
import styled from 'styled-components';

export const StyledAddressInput = styled(Input)`
  border: ${({ validatedaddress }) => validatedaddress && '1px solid rgb(33, 191, 150)'};
  
`;
