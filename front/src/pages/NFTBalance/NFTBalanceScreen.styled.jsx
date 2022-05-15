import { Container } from '@mui/material';
import styled from 'styled-components';
export const StyledNFTBalance = styled(Container)`
  height: 100vh;
  margin-top: 200px;

  #nfts-wrapper{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    padding: 30px;
    max-width: 1000px;
    img{
      height: 300px;
      object-fit: contain;
    }

    #nft{
      width: 240px;
      border: 2px solid #e7eaf3;
    }
  }
`;
