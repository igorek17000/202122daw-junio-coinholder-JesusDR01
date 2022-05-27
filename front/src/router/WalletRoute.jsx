import { Outlet } from 'react-router-dom';
import { SelectProviderModal } from 'components/SelectProviderModal/SelectProviderModal';
import { useMoralis } from 'react-moralis';
import { StyledWalletRoute } from './StyledWalletRoute';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
export const WalletRoute = () => {
  const { isAuthenticated, authenticate } = useMoralis();
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
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
          <SelectProviderModal
            isAuthModalVisible={isAuthModalVisible}
            setIsAuthModalVisible={setIsAuthModalVisible}
            authenticate={authenticate}
          />
        </StyledWalletRoute>
      )}
    </>
  );
};
