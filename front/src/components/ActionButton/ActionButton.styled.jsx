import styled from 'styled-components';
import { Button } from '@mui/material';
export const StyledActionButton = styled(Button)`
cursor:pointer;
  margin: 10px 0px !important;
  background-color: #57ffff !important;
  color: black !important;
  font-weight: bold !important;
  width: 100%;
  &:hover {
    background-color: #00e0e0 !important;
  }
  &:disabled{
    background-color: #e0e0e0 !important;
  }
`;
