import { useEffect, useState } from 'react';
import { Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from './Logos';
import { useChain, useMoralis } from 'react-moralis';
import { StyledChains } from './Chains.styled';
import ChainsMenu from 'components/ChainsMenu';

const menuItems = [
  {
    key: '0x1',
    value: 'Ethereum',
    icon: <ETHLogo />,
  },
  {
    key: '0x38',
    value: 'Binance',
    icon: <BSCLogo />,
  },
  {
    key: '0x89',
    value: 'Polygon',
    icon: <PolygonLogo />,
  },
  {
    key: '0xa86a',
    value: 'Avalanche',
    icon: <AvaxLogo />,
  },
  {
    key: '0x539',
    value: 'Local Chain',
    icon: <ETHLogo />,
  },
  {
    key: '0x3',
    value: 'Ropsten Testnet',
    icon: <ETHLogo />,
  },
  {
    key: '0x4',
    value: 'Rinkeby Testnet',
    icon: <ETHLogo />,
  },
  {
    key: '0x2a',
    value: 'Kovan Testnet',
    icon: <ETHLogo />,
  },
  {
    key: '0x5',
    value: 'Goerli Testnet',
    icon: <ETHLogo />,
  },
  {
    key: '0x61',
    value: 'Smart Chain Testnet',
    icon: <BSCLogo />,
  },
  {
    key: '0x13881',
    value: 'Mumbai',
    icon: <PolygonLogo />,
  },
  {
    key: '0xa869',
    value: 'Avalanche Testnet',
    icon: <AvaxLogo />,
  },
];

function Chains() {
  const { switchNetwork, chainId } = useChain();
  const { isAuthenticated } = useMoralis();
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (!chainId) return null;
    const newSelected = menuItems.find((item) => item.key === chainId);
    setSelected(newSelected);
  }, [chainId]);

  const handleMenuClick = (e) => {
    switchNetwork(e.key);
  };

  if (!isAuthenticated) return null;

  return (
    <StyledChains>
      <Dropdown
        
        overlay={<ChainsMenu menuItems={menuItems} handleMenuClick={handleMenuClick} />}
        trigger={['click']}
      >
        <Button id="chain-selector" className="item" key={selected?.key} icon={selected?.icon}>
          <span className="item-value">{selected?.value}</span>
          <DownOutlined />
        </Button>
      </Dropdown>
    </StyledChains>
  );
}

export default Chains;
