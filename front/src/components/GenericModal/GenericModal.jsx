import { StyledGenericModal } from './GenericModal.styled';
import React from 'react';
import Fade from '@mui/material/Fade';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AnimatePresence, motion } from 'framer-motion';

export const GenericModal = ({ openState, children }) => {
  const [open, setOpen] = openState;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AnimatePresence>
      <StyledGenericModal
        component={motion.div}
        initial={{ opacity: 0, y: "100px" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{  opacity: 0.2, y: 0.3 }}
        
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box id="modal-content">
            <CloseIcon id="close-icon" onClick={handleClose} />
            {children}
          </Box>
        </Fade>
      </StyledGenericModal>
    </AnimatePresence>
  );
};
