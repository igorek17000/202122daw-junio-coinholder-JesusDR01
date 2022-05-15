import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`  
    .menu-appbar a{
    text-decoration: none !important;
    color: black !important;
    }
    main a{
        color:#1976d2;
        &:hover{
            color:black;
        }
    }
`;