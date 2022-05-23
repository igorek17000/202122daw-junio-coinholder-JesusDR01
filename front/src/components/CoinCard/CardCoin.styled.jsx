import styled from 'styled-components';

export const StyledCardCoin = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ invisible }) => (invisible ? 'rgba(0, 0, 0, 0.12)' : 'white')};
  margin: 10px 0px;
  border-radius: 10px;
  padding: 5px;
  position: relative;

  .delete-coin {
    position: absolute;
    left: 10px;
    bottom: 7px;
    min-width: 40px;
    width: 20px;
    padding: 0;
    z-index: 1;
    svg {
      width: 15px;
      height: 15px;
    }
  }

  .coin-wrapper {
    flex: 1;
    .logo-wrapper {
      display: flex;
      align-items: center;
      .logo {
        width: 20px;
        height: 20px;
      }
    }
    .coin-data-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      p {
        font-size: 0.5rem;
      }
    }
  }
`;
