import { Button, Typography, Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledGenericDeleteModal } from './GenericDeleteModal.styled';

export const GenericDeleteModal = ({ handleAction, handleCloseModal, warningMessage, action }) => {
  const { t } = useTranslation();
  return (
    <StyledGenericDeleteModal>
      <Typography component="h2">{warningMessage}</Typography>
      <Box id="actions">
        <Button variant="contained" color="error" onClick={handleAction}>
          {action}
        </Button>
        <Button variant="outlined" onClick={handleCloseModal}>
          {t('forms.actions.cancel')}
        </Button>
      </Box>
    </StyledGenericDeleteModal>
  );
};
