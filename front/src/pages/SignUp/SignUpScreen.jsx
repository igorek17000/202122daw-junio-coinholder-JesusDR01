//@ts-check
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { useRegisterMutation } from '../../app/services/auth';
import Snack from '../../components/Snack/Snack';
import { Loader } from '../../components/Loader/Loader';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm';
import { handleRequestErrors } from '../../helpers/handleRequestErrors';
import React from 'react';
import { SignUpWrapper } from './SignUpScreen.styled';
import { useTranslation } from 'react-i18next';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { cfg } from 'config/config';

export default function SignUpScreen() {
  
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { t } = useTranslation();
  const [register, { isLoading: IsSigningUp }] = useRegisterMutation();
  const formInitialState = {
    name: cfg.defaultDevValues.register.name,
    email: cfg.defaultDevValues.register.email,
    password: cfg.defaultDevValues.register.password,
    passwordConfirmation: cfg.defaultDevValues.register.passwordConfirm,
  };

  const msgShownInitialState = {
    status: '',
    msg: '',
  };
  const [msgShown, setMsgShown] = useState(msgShownInitialState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      const captchaToken = await executeRecaptcha();
      const body = { ...values };
      body['g-recaptcha-response'] = captchaToken;
      delete body['passwordConfirmation'];
      const credentials = await register(body).unwrap();
      dispatch(setCredentials(credentials));
      navigate('/');
    } catch (err) {
      handleRequestErrors(err, setMsgShown);
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return IsSigningUp ? (
    <Loader />
  ) : (
    <SignUpWrapper
    className="animate__animated animate__fadeIn"
      maxWidth="xs"
      // @ts-ignore
      component={'main'}
    >
      <Avatar id="lock" >
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t('register.action')}
      </Typography>
      <Box id="form-wrapper" onSubmit={handleSubmit} >
        <SignUpForm formInitialState={formInitialState} handleSubmit={handleSubmit} />
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link onClick={handleSignIn} href="#" variant="body2">
              {t('register.actions.login')}
            </Link>
          </Grid>
        </Grid>
        <Snack
          initialState={msgShownInitialState}
          severity={msgShown.status}
          msgShown={msgShown.msg}
          setMsgShown={setMsgShown}
        />
      </Box>
    </SignUpWrapper>
  );
}
