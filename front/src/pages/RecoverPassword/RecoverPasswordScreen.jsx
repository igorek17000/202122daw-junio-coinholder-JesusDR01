//@ts-check
import { StyledRecoverPassword } from './RecoverPasswordScreen.styled';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { Loader } from 'components/Loader/Loader';
import Snack from 'components/Snack/Snack';
import { RecoverForm } from 'components/RecoverForm/RecoverForm';
import { useRecover } from 'hooks/auth/useRecover';

import { useTranslation } from 'react-i18next';
import { useRecoverPasswordMutation } from 'app/services/auth';
import { LoginActions } from 'components/LoginActions/LoginActions';
import { Link } from 'react-router-dom';
import React from 'react';

export const RecoverPasswordScreen = () => {
  const { t } = useTranslation();
  const [recover, { isLoading: isRecovering }] = useRecoverPasswordMutation();
  const { handleRecovery, msgShown, setMsgShown } = useRecover({ recover });
  const initialValues = {
    password: '',
    confirmPassword: '',
  };
  return isRecovering ? (
    <Loader />
  ) : (
    <StyledRecoverPassword component="main" className="animate__animated animate__fadeIn">
      <Avatar id="lock">
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t('recover.action')}
      </Typography>
      <Box>
        <RecoverForm initialValues={initialValues} handleSubmit={handleRecovery} />
        <LoginActions>
          <Grid item>
            <Link to="/login">{t('login.action')}</Link>
          </Grid>
        </LoginActions>
      </Box>

      <Snack severity={msgShown.status} msgShown={msgShown.msg} setMsgShown={setMsgShown} />
    </StyledRecoverPassword>
  );
};
