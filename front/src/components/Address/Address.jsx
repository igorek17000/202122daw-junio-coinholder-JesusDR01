import { useEffect } from 'react';
import { useState } from 'react';
import { getEllipsisTxt } from '../../helpers/formatters';
import Blockie from '../Blockie/Blockie';
import { useMoralis } from 'react-moralis';
import { Skeleton } from 'antd';
import { StyledAddress } from './Address.styled';
import { Copy } from 'components/Copy/Copy';
import { Check } from 'components/Check/Check';

function Address(props) {
  const { account, isAuthenticated } = useMoralis();
  const [address, setAddress] = useState();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setAddress(props?.address || (isAuthenticated && account));
  }, [account, isAuthenticated, props]);

  if (!address) return <Skeleton paragraph={{ rows: 1, width: '100%' }} title={false} active />;

  return (
    <StyledAddress id="my-address">
      {props.avatar === 'left' && <Blockie address={address} size={7} />}
      <p>{props.size ? getEllipsisTxt(address, props.size) : address}</p>
      {props.avatar === 'right' && <Blockie address={address} size={7} />}
      {props.copyable &&
        (isClicked ? <Check /> : <Copy address={address} setIsClicked={setIsClicked} />)}
    </StyledAddress>
  );
}

export default Address;
