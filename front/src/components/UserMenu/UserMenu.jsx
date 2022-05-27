import React from 'react';
import Account from 'components/Account/Account';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useAuth } from 'hooks/auth/useAuth';
import { useDispatch } from 'react-redux';
import { logout } from 'features/auth/authSlice';
import { Link } from 'react-router-dom';
import { emptySplitApi } from 'app/services/baseAPI';
import { useTranslation } from 'react-i18next';
import { unsetCurrentPortfolio } from 'features/portfolios/portfoliosSlice';

export function UserMenu() {
  const {t} = useTranslation();
  const isAuthenticated = useAuth()?.user?.token;
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    dispatch(emptySplitApi.util.resetApiState());
    dispatch(logout());
    dispatch(unsetCurrentPortfolio());
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
         id="user-menu"
        anchorEl={anchorEl}
        anchorPosition={{
          top: 50,
          left: 400
        }}
        keepMounted
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Account />
        </MenuItem>
        {isAuthenticated ? (
          <div>
            <Link to="/profile">
              <MenuItem onClick={handleClose}>👤 {t('nav.profile')}</MenuItem>
            </Link>
            <Link to="/login" onClick={handleLogout}>
              <MenuItem>🚪 {t('nav.logout')}</MenuItem>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <MenuItem key="/login" onClick={handleClose}>
                👤 {t('nav.login')}
              </MenuItem>
            </Link>
            <Link to="/register">
              <MenuItem key="/register" onClick={handleClose}>
                👤➕ {t('nav.register')}
              </MenuItem>
            </Link>
          </div>
        )}
      </Menu>
    </div>
  );
}
