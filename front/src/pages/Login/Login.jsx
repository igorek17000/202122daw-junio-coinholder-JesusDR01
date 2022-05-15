import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Typography, Container } from '@mui/material';
import Snack from '../../components/Snack/Snack';
import { Loader } from '../../components/Loader/Loader';
import { useLogin } from '../../hooks/auth/useLogin';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import React from 'react';
import { LoginActions } from '../../components/LoginActions/LoginActions';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../../app/services/auth';
import { Grid } from '@mui/material';
import { cfg } from 'config/config';
import querystring from 'query-string';
import { Google, GitHub, Facebook, Twitter } from '@mui/icons-material';
import { LoginWrapper } from './Login.styled';
import { useTranslation } from 'react-i18next';

export const LoginScreen = () => {
  const { t } = useTranslation();
  const parsed = querystring.parse(window.location.search);

  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const dataInitialState = {
    email: '',
    password: '',
  };

  const { data, msgShown, setMsgShown, handleSubmit } = useLogin({
    login,
    dataInitialState,
    token: parsed?.token,
  });

  return isLoggingIn ? (
    <Loader />
  ) : (
    <LoginWrapper component="main" maxWidth="md">
      <Avatar id="avatar">
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t('login.title')}
      </Typography>
      <Box>
        <Box>
          <LoginForm formInitialState={data} handleSubmit={handleSubmit} />
        </Box>
        <LoginActions>
          <Grid item mx={{ base: 0 }}>
            <Link to="/forgot-password">{t('login.actions.forgot')}</Link>
          </Grid>
        </LoginActions>
        <div className="strike">
          <span>{t('login.divider')}</span>
        </div>
      </Box>

      <Box className="social">
        <a id="facebook" title="Login with Facebook" href={`${cfg.apiUrl}auth/facebook`}>
          <Facebook />
        </a>
        <a id="google" title="Login with Google" href={`${cfg.apiUrl}auth/google`}>
          <Google />
        </a>
        <a id="github" title="Login with Github" href={`${cfg.apiUrl}auth/github`}>
          <GitHub />
        </a>
        <a id="twitter" title="Login with Twitter" href={`${cfg.apiUrl}auth/twitter`}>
          <Twitter />
        </a>
      </Box>
      <Snack severity={msgShown.status} msgShown={msgShown.msg} setMsgShown={setMsgShown} />
    </LoginWrapper>
  );
};
