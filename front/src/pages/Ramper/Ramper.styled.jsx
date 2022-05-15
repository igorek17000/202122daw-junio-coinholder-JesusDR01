import styled from 'styled-components';

export const StyledRamper = styled.iframe`
  width: 90%;
  height: 75vh;
  box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
  border: 1px solid #e7eaf3;
  border-radius: 1rem;
  background-color: white;

  @media (min-width: 768px) {
    width: 625px;
  }
`;
