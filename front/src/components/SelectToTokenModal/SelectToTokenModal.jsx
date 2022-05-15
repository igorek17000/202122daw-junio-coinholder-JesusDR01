import React from 'react';
import { StyledSelectToTokenModal } from './SelectToTokenModal.styled';
import { useTranslation } from 'react-i18next';
import InchModal from 'components/InchModal';

export const SelectToTokenModal = ({ isToModalActive, setToModalActive, setToToken, tokens }) => {
  const { t } = useTranslation();
  return (
    <StyledSelectToTokenModal
      title={t('dex.selectToken')}
      visible={isToModalActive}
      onCancel={() => setToModalActive(false)}
      footer={null}
    >
      <InchModal
        open={isToModalActive}
        onClose={() => setToModalActive(false)}
        setToken={setToToken}
        tokenList={tokens}
      />
    </StyledSelectToTokenModal>
  );
};
