import { Menu } from '@mui/material';

import styled from 'styled-components';

export const StyledActionsMenu = styled(Menu)`
  button {
    margin: 3px;
  }
  background: ${({ disabled }) => disabled && 'red'};
`;
