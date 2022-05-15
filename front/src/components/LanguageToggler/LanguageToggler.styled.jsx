import styled from 'styled-components';

export const LanguageTogglerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  caret-color: transparent;
  margin-left: 30px;
  min-width: 12%  ;
  button {
    background: transparent;
    border: none;
    img {
      width: 30px;
      height: auto;
      cursor: pointer;
    }
  }
`;
