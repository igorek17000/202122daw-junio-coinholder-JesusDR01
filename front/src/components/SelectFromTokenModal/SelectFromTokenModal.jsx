import React from 'react';
import { StyledSelectFromTokenModal } from './SelectFromTokenModal.styled';
import InchModal from 'components/InchModal';
import { useTranslation } from 'react-i18next';
export const SelectFromTokenModal = ({
  isFromModalActive,
  setFromModalActive,
  setFromToken,
  tokens,
}) => {
  const { t } = useTranslation();

  return (
    <StyledSelectFromTokenModal
      title={t('dex.selectToken')}
      visible={isFromModalActive}
      onCancel={() => setFromModalActive(false)}
      footer={null}
    >
      <InchModal
        open={isFromModalActive}
        onClose={() => setFromModalActive(false)}
        setToken={setFromToken}
        tokenList={tokens}
      />
    </StyledSelectFromTokenModal>
  );
};
