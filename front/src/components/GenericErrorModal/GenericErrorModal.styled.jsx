import styled from 'styled-components';

import { Box } from '@mui/material';

export const StyledGenericErrorModal = styled(Box)`
text-align: center;
#error-img{
    width: 100%;
    margin: 10px auto;
    height: 65px;

    img{
        width: initial;
    }
}
article{
    margin: 10px;
}
`;
