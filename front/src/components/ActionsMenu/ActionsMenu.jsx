import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import NoteIcon from '@mui/icons-material/Note';
import {  Button, MenuItem } from '@mui/material';
import { StyledActionsMenu } from './ActionsMenu.styled';

export function ActionsMenu({ anchorEl, open, handleClose, transaction, actionHandlers }) {
  const {
    handleOpenDeleteModal,
    handleOpenNotesModal,
    handleOpenUpdateModal,
    handleDisableTransaction,
  } = actionHandlers;
  return (
    <StyledActionsMenu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleClose}>
        <Button variant="outlined" onClick={() => handleOpenUpdateModal(transaction._id)}>
          <EditIcon />
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleOpenDeleteModal(transaction._id)}
        >
          <DeleteIcon />
        </Button>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        {transaction.disabled ? (
          <Button variant="outlined" color="info" onClick={() => handleDisableTransaction(transaction)}>
            <AttachMoneyIcon />
          </Button>
        ) : (
          <Button variant="outlined" color="info" onClick={() => handleDisableTransaction(transaction)}>
            <MoneyOffIcon />
          </Button>
        )}
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleOpenNotesModal(true)}
          disabled={!transaction.notes}
        >
          <NoteIcon />
        </Button>
      </MenuItem>

    </StyledActionsMenu>
  );
}
