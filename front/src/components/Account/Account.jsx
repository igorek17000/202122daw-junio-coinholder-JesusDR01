import { useMoralis } from 'react-moralis';
import { getEllipsisTxt } from 'helpers/formatters';
import Blockie from '../Blockie/Blockie';
import { useState } from 'react';
import { getExplorer } from 'helpers/networks';
import { useTranslation } from 'react-i18next';
import { StyledAccount } from './Account.styled';
import { SelectProviderModal } from '../SelectProviderModal/SelectProviderModal';
import { ManageWeb3AccountModal } from 'components/ManageWeb3Account/ManageWeb3Account';
import GenericModal from 'components/GenericModal';

function Account() {
  const { t } = useTranslation();
  const { authenticate, isAuthenticated, account, chainId, logout } = useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModalState = useState(false);
  const [, setIsAuthModalVisible] = openModalState;
  return (
    <>
      <StyledAccount onClick={() => setIsAuthModalVisible(true)}>
        {!isAuthenticated || !account ? (
          <>🪙{t('nav.authenticate')}</>
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
      <GenericModal openState={openModalState}>
        <SelectProviderModal
          setIsAuthModalVisible={setIsAuthModalVisible}
          authenticate={authenticate}
        />
      </GenericModal>
    </>
  );
}

export default Account;
