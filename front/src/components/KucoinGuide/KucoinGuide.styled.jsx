import styled from 'styled-components';

import { Box } from '@mui/material';

export const StyledKucoinGuide = styled(Box)`
  #guide {
    overflow: auto;
    max-height: 57vh;
    h2 {
      font-size: 1.5rem;
    }
    p {
      a {
        margin-left: 2px;
      }
    }
    img {
      width: 90%;
    }
  }
  @media screen and (min-width: 600px) {
    #guide {
      img {
        max-width: 67vw;
      }
    }
  }
`;
