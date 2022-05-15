import styled from 'styled-components';

import { Box } from '@mui/material';
import { Formik } from 'formik';

export const StyledRecoverForm = styled.div`
  button[type="submit"] {
    margin: 10px 0px;
    background-color: #57ffff;
    &:hover {
      background-color: #00e0e0;
    }
    color: black;
    font-weight: bold;
  }
`;
