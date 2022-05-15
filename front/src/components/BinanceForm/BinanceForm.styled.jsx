import styled from 'styled-components';

import { Box } from '@mui/material';
import { Formik } from 'formik';

export const StyledBinanceForm = styled(Formik)`
  button[type='submit'] {
    margin: 0 5px;
    background-color: #57ffff;
    &:hover {
      background-color: #00e0e0;
    }
    color: black;
    font-weight: bold;
  }
`;
