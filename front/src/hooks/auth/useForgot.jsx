import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export const useForgot = ({ forgotPassword }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const msgInitialState = {
    status: '',
    msg: '',
  };
  const [msgShown, setMsgShown] = useState(msgInitialState);

  const handleSubmit = async (values) => {
    try {
      const captchaToken = await executeRecaptcha();
      const { msg } = await forgotPassword({
        ...values,
        'g-recaptcha-response': captchaToken,
      }).unwrap();
      setMsgShown({
        status: 'success',
        msg,
      });
    } catch (err) {
      const forgotPasswordErrors = err?.data?.errors;
      if (forgotPasswordErrors?.length > 0) {
        setMsgShown({
          status: 'error',
          msg: Object.values(forgotPasswordErrors[0])[0],
        });
      } else {
        setMsgShown({
          status: 'error',
          msg: 'Error trying to reset the password. Try again.',
        });
      }
    }
  };
  return { handleSubmit, msgShown, setMsgShown };
};
