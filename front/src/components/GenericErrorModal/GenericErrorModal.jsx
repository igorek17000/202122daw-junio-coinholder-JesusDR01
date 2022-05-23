import { Avatar } from '@mui/material';
import { Typography } from 'antd';
import GenericModal from 'components/GenericModal';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledGenericErrorModal } from './GenericErrorModal.styled';

export const GenericErrorModal = ({ error }) => {
  const {t} = useTranslation()
  const openState = useState(false);
  const [, setOpen] = openState;
  useEffect(() => {
    if (error){
      setOpen(true);
    }
  }, []);
  return (
    <GenericModal openState={openState}>
      <StyledGenericErrorModal>
        <Avatar id="error-img" src="assets/error-modal.png"/>
          <Typography>{error?.data?.error ? t(`errors.${error?.data?.error }`) : t(`error.unknown`)}</Typography>
      </StyledGenericErrorModal>
    </GenericModal>
  );
};
