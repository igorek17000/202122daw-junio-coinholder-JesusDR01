import React from 'react';
import { StyledManageWeb3AccountModal } from './ManageWeb3Account.styled';
import { Button, Card } from 'antd';
import Address from '../Address/Address';
import { SelectOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export const ManageWeb3AccountModal = ({
  isModalVisible,
  setIsModalVisible,
  getExplorer,
  chainId,
  account,
  logout,
}) => {
  const { t } = useTranslation();
  const handleDisconnect = async () => {
    await logout();
    window.localStorage.removeItem('connectorId');
    setIsModalVisible(false);
  };
  return (
    <StyledManageWeb3AccountModal
      visible={isModalVisible}
      footer={null}
      onCancel={() => setIsModalVisible(false)}
    >
      {t('nav.account')}
      <Card id="account-address">
        <Address avatar="left" size={6} copyable />
        <div id="account-explorer">
          <a href={`${getExplorer(chainId)}/address/${account}`} target="_blank" rel="noreferrer">
            <SelectOutlined id="select-icon" />
            {t('nav.explorer')}
          </a>
        </div>
      </Card>
      <Button id="disconnect" size="large" type="primary" onClick={handleDisconnect}>
        {t('nav.disconnect')}
      </Button>
    </StyledManageWeb3AccountModal>
  );
};
