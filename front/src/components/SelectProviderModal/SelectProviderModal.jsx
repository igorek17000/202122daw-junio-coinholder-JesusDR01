import React from 'react';
import { StyledSelectProviderModal } from './SelectProviderModal.styled';
import { connectors } from './config';
import { useTranslation } from 'react-i18next';
import { Typography, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

export const SelectProviderModal = ({ setIsAuthModalVisible, authenticate }) => {
  const { t } = useTranslation();
  const matches = useMediaQuery('(max-width:600px)');
  return (
    <StyledSelectProviderModal className="select-provider-modal">
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
      {matches && (
        <>
          <Typography>{t('nav.connectWalletMobileHelp')}</Typography>
          <Typography>
            <Link to="/faq" onClick={() => setIsAuthModalVisible(false)}>
              {t('nav.connectWalletMobileHelpLink')}
            </Link>
          </Typography>
        </>
      )}
    </StyledSelectProviderModal>
  );
};
