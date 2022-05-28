import styled from 'styled-components';

import { Box } from '@mui/material';

export const StyledFaqMetamaskGuide = styled(Box)`
    /* max-height:  ${({ matches }) => matches ? '72vh' : '62vh'} ; */
    overflow-y: auto;
    height: 40vh;
    img{
        width: 100%;
    }
    @media screen and (min-width: 768px) {
        height: 70vh;
        img {
            width: 50%;
        }
    }
`;