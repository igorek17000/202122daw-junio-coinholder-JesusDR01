import { Grid } from '@mui/material';
import styled from 'styled-components';

export const StyledLoginActions = styled(Grid)`
  flex-direction: column !important;
  justify-content: space-around !important;
  align-items: center !important;

  @media screen and (min-width: 768px) {
    flex-direction: row  !important;
    align-items: flex-end  !important;
  }
`;
