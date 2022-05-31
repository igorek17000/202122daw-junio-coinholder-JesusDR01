import styled from 'styled-components';

export const StyledPortfolios = styled.main`
  padding-top: 6vh;
  #no-portfolios {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h2 {
      font-size: 2.6rem;
    }
    button {
      font-size: 2rem;
      background-color: #57ffff;
      &:hover {
        background-color: #00e0e0;
      }
      color: black;
      font-weight: bold;
    }
  }
  width: 90%;
  .add-fab {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 11vw;
    max-width: 64px;
    height: 11vw;
    max-height: 64px;
    /* filter: brightness(3.5); */
    background-color: #57ffff;
    color: black;
    &:hover {
      background-color: #00e0e0;
    }
  }
  #import {
    display: flex;
    flex-direction: column;
    height: 100px;
    justify-content: space-evenly;
    button {
      height: 28px;
    }
  }
  .btn-styled {
    background-color: #57ffff;
    color: black;
    font-weight: bold;
    height: 38px;
    &:hover {
      background-color: #00e0e0;
    }
  }
  #portfolios-manager-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    position: sticky;
    top: 0;
    z-index: 2;

    > p,
    > div {
      flex: 1;
    }

    @media screen and (min-width: 600px) {
      margin: 0 5px;
    }

    .icon-wrapper{
      margin:  5px 0;
    }
    #total {
      margin-left: 3px;
    }
    #portfolios-manager {
      border-radius: 5px;
      right: 4vw;
      padding-top: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: wrap;
      .icon-wrapper {
        margin-left: 3px;
        background-color: transparent;
        button {
          width: 33px;
          min-width: 34px;
          margin: 0px 5px;
          height: 35px;
        }
      }
    }
  }
  #delete-modal {
    display: flex;
  }
`;
