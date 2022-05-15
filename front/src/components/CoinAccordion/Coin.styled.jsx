import styled from 'styled-components';

export const StyledCoin = styled.div`
  position: relative;
  padding: 5px;
  .delete-coin {
    position: absolute;
    left: 10px;
    top: 10px;
    min-width: 20px;
    width: 10px;
    padding: 0;
    z-index:1;
    svg {
      width: 20px;
      height: 20px;
    }
  }

  .accordion {
    min-width: 50%;
    align-items: center;
    .logo-wrapper {
      display: flex;
      flex: 0.5;
      align-items: center;
      align-content: center;
      .logo {
        width: 50px;
        height: 50px;
        margin: 10px;
      }
    }
  }
`;
