import { useMoralis } from 'react-moralis';
import { getEllipsisTxt } from 'helpers/formatters';
import Blockie from '../Blockie/Blockie';
import { useState } from 'react';
import { getExplorer } from 'helpers/networks';
import { useTranslation } from 'react-i18next';
import { StyledAccount } from './Account.styled';
import { SelectProviderModal } from '../SelectProviderModal/SelectProviderModal';
import { ManageWeb3AccountModal } from 'components/ManageWeb3Account/ManageWeb3Account';

function Account() {
  const { t } = useTranslation();
  const { authenticate, isAuthenticated, account, chainId, logout } = useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  return (
    <StyledAccount>
      {!isAuthenticated || !account ? (
        <>
          <div onClick={() => setIsAuthModalVisible(true)}>
            <p>🪙{t('nav.authenticate')}</p>
          </div>
          <SelectProviderModal
            isAuthModalVisible={isAuthModalVisible}
            setIsAuthModalVisible={setIsAuthModalVisible}
            authenticate={authenticate}
          />
        </>
      ) : (
        <>
          <div id="account" onClick={() => setIsModalVisible(true)}>
            <p>{getEllipsisTxt(account, 6)}</p>
            <Blockie currentWallet scale={3} />
          </div>
          <ManageWeb3AccountModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            getExplorer={getExplorer}
            chainId={chainId}
            account={account}
            logout={logout}
          />
        </>
      )}
    </StyledAccount>
  );
}

export default Account;
