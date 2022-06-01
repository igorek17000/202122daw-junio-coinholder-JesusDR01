import { Box } from '@mui/material';
import styled from 'styled-components';
export const StyledImportScreen = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
  #import-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }

  #binance-wrapper,
  #kucoin-wrapper, #address-wrapper {
    padding: 23px 44px;
    text-align: center;
    box-shadow: 2;
    margin: 10px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 10px;
  }

  #address-wrapper .avatar{
    border-radius: 0px;
  }

  .btn-styled {
    background-color: #57ffff;
    &:hover{
      background-color: #00e0e0;
    }
    color: black;
    font-weight: bold;
    height: 38px;
  }

  a:hover p{
    color: #57ffff !important;
  }
`;
