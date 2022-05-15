import React from 'react';
import { useMoralis } from 'react-moralis';
import { getEllipsisTxt } from '../../helpers/formatters';
import { getExplorer } from '../../helpers/networks';
import 'antd/dist/antd.css';
import { Skeleton, ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import esES from 'antd/lib/locale/es_ES';

import { useERC20Transfers } from 'hooks/useERC20Transfers';
import { StyledTransfersScreen } from './ERC20TransfersScreen.styled';
import Table from 'ant-responsive-table';
import { useTranslation } from 'react-i18next';
import i18n from 'helpers/i18n';

export const ERC20TransfersScreen = () => {
  const { t } = useTranslation();
  let { ERC20Transfers, chainId } = useERC20Transfers();
  const { Moralis } = useMoralis();
  if (ERC20Transfers) {
    ERC20Transfers = ERC20Transfers.map((asset, i) => ({ ...asset, key: i }));
  }
  const columns = [
    {
      title: t('transfers.address'),
      dataIndex: 'address',
      key: 'address',
      showOnResponse: true,
      showOnDesktop: true,
      render: (token) => getEllipsisTxt(token, 8),
    },
    {
      title: t('transfers.from'),
      dataIndex: 'from_address',
      key: 'from_address',
      showOnResponse: true,
      showOnDesktop: true,
      render: (from) => getEllipsisTxt(from, 8),
    },
    {
      title: t('transfers.to'),
      dataIndex: 'to_address',
      key: 'to_address',
      showOnResponse: true,
      showOnDesktop: true,
      render: (to) => getEllipsisTxt(to, 8),
    },
    {
      title: t('transfers.value'),
      dataIndex: 'value',
      key: 'value',
      showOnResponse: true,
      showOnDesktop: true,
      render: (value, item) => parseFloat(Moralis.Units.FromWei(value, item?.decimals)).toFixed(6),
    },
    {
      title: t('transfers.hash'),
      dataIndex: 'transaction_hash',
      key: 'transaction_hash',
      showOnResponse: true,
      showOnDesktop: true,
      render: (hash) => (
        <a href={`${getExplorer(chainId)}tx/${hash}`} target="_blank" rel="noreferrer">
          {t('transfers.view')}
        </a>
      ),
    },
  ];

  let key = 0;
  return (
    <StyledTransfersScreen language={i18n?.language}>
      <h1>{t('transfers.title')} </h1>
      <Skeleton loading={!ERC20Transfers}>
        <Table
          antTableProps={{
            showHeader: true,
            columns,
            locale: { esES },
            dataSource: ERC20Transfers,
            rowKey: (record) => {
              key++;
              return `${record?.transaction_hash}-${key}`;
            },
          }}
          mobileBreakPoint={1200}
        />
      </Skeleton>
    </StyledTransfersScreen>
  );
};
