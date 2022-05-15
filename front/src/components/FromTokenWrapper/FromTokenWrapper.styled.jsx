import styled from 'styled-components';

import { Card } from 'antd';

export const StyledFromTokenWrapper = styled(Card)`
      border-radius: 1rem;
      .ant-card-body{
      padding: 0.8rem;
    }
    #input-wrapper{
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        #amount{
            font-weight: 600;
            color: #434343;
        }
        #select-coin{
            height: fit-content;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: space-between;
            border-radius: 0.6rem;
            padding: 5px 10px;
            font-weight: 500;
            gap: 7px;
            border: none;
            img{
                width: 30px;
                border-radius: 15px;
            }
        }
    }
`;