import styled from 'styled-components';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

export const StyledTransactionDrawer = styled(SwipeableDrawer)`
#pagination{
  padding: 10px;
  margin:0 auto;
}
.coin-header{
  flex: unset;
}
  .MuiPaper-root {
    height: 90vh;
    overflow-y: auto;
    overflow: visible;
    border-radius: 20px;
    .drawer-back-wrapper {
      position: relative;
      height: 50px;
    }
    .puller {
      position: absolute;
      width: 30px;
      height: 6px;
      border-radius: 8px;
      position: absolute;
      top: 8px;
      left: calc(50% - 15px);
      background-color: #8080809b;
    }
  }
  .transactions-wrapper{
    overflow-y: auto;
  }
  .logo-wrapper{
    margin-left: 10px;
  }
`;
