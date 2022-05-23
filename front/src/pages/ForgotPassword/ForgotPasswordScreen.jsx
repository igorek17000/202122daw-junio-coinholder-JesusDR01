import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Loader } from '../../components/Loader/Loader';
import Snack from '../../components/Snack/Snack';
import { ForgotForm } from '../../components/ForgotForm/ForgotForm';
import { useForgot } from '../../hooks/auth/useForgot';

import { useForgotPasswordMutation } from '../../app/services/auth';

import React from 'react';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { LoginActions } from '../../components/LoginActions/LoginActions';

import { useTranslation } from 'react-i18next';
import { StyledForgotPassword } from './ForgotPassword.styled';
const theme = createTheme();

export const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const [forgotPassword, { isLoading: isForgettingPassword, isSuccess }] =
    useForgotPasswordMutation();
  const initialValues = {
    email: 'admin25@admin.com',
  };
  const { handleSubmit, msgShown, setMsgShown } = useForgot({ forgotPassword });

  return isForgettingPassword ? (
    <Loader />
  ) : (
    <StyledForgotPassword component="main" maxWidth="lg">
      <Avatar id="lock">
        <LockOutlinedIcon />
      </Avatar>

      {isSuccess ? (
        <Box>
          <Typography component="h1" variant="h5">
            {t('forgot.success')}
          </Typography>
        </Box>
      ) : (
        <>
          <Typography component="h1" variant="h5">
            {t('forgot.action')}
          </Typography>
          <Box>
            <Box>
              <ForgotForm handleSubmit={handleSubmit} initialValues={initialValues} />
            </Box>
            <LoginActions>
              <Grid item mx={5}>
                <Link to="/login">{t('login.action')}</Link>
              </Grid>
            </LoginActions>
          </Box>
        </>
      )}
      <Snack
        msgShown={msgShown.msg}
        setMsgShown={setMsgShown}
        severity={msgShown.status || 'error'}
      />
    </StyledForgotPassword>
  );
};