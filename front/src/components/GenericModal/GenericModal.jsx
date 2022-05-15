import { StyledGenericModal } from './GenericModal.styled';
import React from 'react';
import Fade from '@mui/material/Fade';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const GenericModal = ({ openState, children }) => {
  const [open, setOpen] = openState;
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <StyledGenericModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box id="modal-content">
          <CloseIcon id="close-icon" onClick={handleClose}/>
          {children}
          </Box>
      </Fade>
    </StyledGenericModal>
  );
};
