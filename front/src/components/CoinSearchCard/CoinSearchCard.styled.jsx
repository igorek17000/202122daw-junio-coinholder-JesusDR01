import styled from 'styled-components';

import { Box } from '@mui/material';

export const StyledCoinSearchCard = styled(Box)`
    display:flex;   
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    background-color: whitesmoke;
    border: 1px solid black;
    #basic-data{
        display:flex;
        align-items:center;
        img{
            padding:3px;
        }
    }
`;