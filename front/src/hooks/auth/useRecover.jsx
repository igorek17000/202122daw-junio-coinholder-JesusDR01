import { handleRequestErrors } from 'helpers/handleRequestErrors';
import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useTranslation } from 'react-i18next';

export const useRecover = ({ recover }) => {
  const { t } = useTranslation();
  const msgInitialState = {
    status: '',
    msg: '',
  };
  const [msgShown, setMsgShown] = useState(msgInitialState);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleRecovery = async (values) => {
    try {
      const body = { ...values, recoverToken: window.location.pathname.split('/')[2] };
      const captchaToken = await executeRecaptcha();
      body['g-recaptcha-response'] = captchaToken;
      await recover(body).unwrap();
      setMsgShown({ status: 'success', msg: t("recover.update") });
    } catch (err) {
      // console.log(err);
      handleRequestErrors(err, setMsgShown);
    }
  };
  return { handleRecovery, msgShown, setMsgShown };
};
