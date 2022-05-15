import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { handleRequestErrors } from '../../helpers/handleRequestErrors';
import { useState } from 'react';
import jwt from 'jwt-decode';
import { useValidateTokenQuery } from 'app/services/auth';

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
export const useLogin = ({ login, dataInitialState: { email, password }, token }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const dispatch = useDispatch();
  const msgShownInitialState = {
    status: '',
    msg: '',
  };
  const [msgShown, setMsgShown] = useState(msgShownInitialState);

  const [data, setData] = useState({
    email,
    password,
  });

  try {
    const renewResponse = useValidateTokenQuery(token, { skip: token === undefined });
    if (renewResponse.isSuccess) {
      const {
        data: { token: validToken },
      } = renewResponse;
      const decoded = jwt(token);
      const { email, username } = decoded;
      dispatch(setCredentials({ email, username, token: validToken }));
    }
  } catch (err) {
    // console.log(err);
    // console.log('no valid token');
  }

  const handleSubmit = async (values) => {
    try {
      const captchaToken = await executeRecaptcha();
      const body = { ...values };
      body['g-recaptcha-response'] = captchaToken;
      const credentials = await login(body).unwrap();
      setData({ ...body });
      dispatch(setCredentials(credentials));
    } catch (err) {
      // console.log(err);
      handleRequestErrors(err, setMsgShown);
    }
  };


  return {
    data,
    msgShown,
    setMsgShown,
    handleSubmit,
  };
};
