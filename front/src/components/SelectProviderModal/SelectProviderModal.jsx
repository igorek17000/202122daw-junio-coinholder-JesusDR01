import React from 'react';
import { StyledSelectProviderModal } from './SelectProviderModal.styled';
import { connectors } from './config';
import { useTranslation } from 'react-i18next';

export const SelectProviderModal = ({
  isAuthModalVisible,
  setIsAuthModalVisible,
  authenticate,
}) => {
  const { t } = useTranslation();
  return (
    <StyledSelectProviderModal
    className="select-provider-modal"
      visible={isAuthModalVisible}
      footer={null}
      onCancel={() => setIsAuthModalVisible(false)}
    >
      <h2>{t('nav.connectWallet')}</h2>
      <div id="providers-wrapper">
        {connectors.map(({ title, icon, connectorId }, key) => (
          <div
            className="connector"
            key={key}
            onClick={async () => {
              try {
                await authenticate({
                  provider: connectorId,
                });
                window.localStorage.setItem('connectorId', connectorId);
                setIsAuthModalVisible(false);
              } catch (e) {
                console.error(e);
              }
            }}
          >
            <img src={icon} alt={title} className="connector-icon" />
            <h4> {title} </h4>
          </div>
        ))}
      </div>
    </StyledSelectProviderModal>
  );
};
