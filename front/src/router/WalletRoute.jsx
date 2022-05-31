import { Outlet } from 'react-router-dom';
import { SelectProviderModal } from 'components/SelectProviderModal/SelectProviderModal';
import { useMoralis } from 'react-moralis';
import { StyledWalletRoute } from './StyledWalletRoute';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { GenericModal } from 'components';
export const WalletRoute = () => {
  const { isAuthenticated, authenticate } = useMoralis();
  const openModalState = useState(false);
  const [, setIsAuthModalVisible] = openModalState;
  const { t } = useTranslation();
  return (
    <>
      <Outlet />
      {!isAuthenticated && (
        <StyledWalletRoute id="notification-wallet">
          <div>
            <p>
              {t('notification.authenticate')}
              <span onClick={() => setIsAuthModalVisible(true)}>{t('nav.authenticate')}</span>
            </p>
          </div>
          <GenericModal openState={openModalState}>
            <SelectProviderModal setIsAuthModalVisible={setIsAuthModalVisible} authenticate={authenticate} />
          </GenericModal>
        </StyledWalletRoute>
      )}
    </>
  );
};
