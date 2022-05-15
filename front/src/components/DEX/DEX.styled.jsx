import styled from 'styled-components';

export const StyledDex = styled.div`
  #dex-body {
    width: 100%;
    box-shadow: 0 0.5rem 1.2rem rgb(189 197 209 / 20%);
    border: 1px solid #e7eaf3;
    border-radius: 1rem;
    font-size: 16px;
    font-weight: 500;
    .ant-card-body {
      padding: 18px;
    }
  }
  #from-input,
  #to-input {
    padding: 0;
    font-weight: 500;
    font-size: 23px;
    display: block;
    width: 100%;
  }

  label {
    margin-bottom: 5px;
    font-size: 14px;
    color: #434343;
  }

 
`;
