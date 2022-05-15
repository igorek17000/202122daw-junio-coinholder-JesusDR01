import { useMoralis, useERC20Balances } from 'react-moralis';

import { Skeleton } from 'antd';
import { getEllipsisTxt } from '../../helpers/formatters';

import 'antd/dist/antd.css';
import { StyledBalances } from './ERC20Balance.styled';
import Table from 'ant-responsive-table';
import { useTranslation } from 'react-i18next';

export const ERC20BalanceScreen = (props) => {
  const {t} = useTranslation();
  let { data: assets } = useERC20Balances(props);
  const { Moralis } = useMoralis();
  if (assets){
    assets = assets.map((asset, i) => ({ ...asset, key: i }));
  }
  const columns = [
    {
      title: '',
      dataIndex: 'logo',
      key: 'logo',
      showOnResponse: true,
      showOnDesktop: true,
      render: (logo) => {
        return (
          <img
            src={logo || 'https://etherscan.io/images/main/empty-token.png'}
            alt="nologo"
            width="28px"
            height="28px"
            style={{ maxWidth: '28px' }}
          />
        );
      },
    },
    {
      title: t('balances.name'),
      dataIndex: 'name',
      key: 'name',
      showOnResponse: true,
      showOnDesktop: true,
      render: (name) => name,
    },
    {
      title: t('balances.symbol'),
      dataIndex: 'symbol',
      key: 'symbol',
      showOnResponse: true,
      showOnDesktop: true,

      render: (symbol) => symbol,
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      showOnResponse: true,
      showOnDesktop: true,

      render: (value, item) =>
        parseFloat(Moralis?.Units?.FromWei(value, item?.decimals)).toFixed(3),
    },
    {
      title: t('balances.address'),
      dataIndex: 'token_address',
      key: 'token_address',
      showOnResponse: true,
      showOnDesktop: true,

      render: (address) => getEllipsisTxt(address, 5),
    },
  ];

  // console.log(columns);
  return (
    <StyledBalances>
      <h1>{t('balances.title')}</h1>
      <Skeleton loading={!assets}>
        <Table
          antTableProps={{
            showHeader: true,
            columns,
            dataSource: assets,
            pagination: false,
          }}
          mobileBreakPoint={900}
        />
      </Skeleton>
    </StyledBalances>
  );
}