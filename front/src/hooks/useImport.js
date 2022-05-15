import { handleRequestErrors } from '../helpers/handleRequestErrors';
import { useState } from 'react';
export const useImport = ({ importPortfolio, formInitialState }) => {
  const msgShownInitialState = {
    status: '',
    msg: '',
  };
  const [msgShown, setMsgShown] = useState(msgShownInitialState);

  const [data, setData] = useState(formInitialState);

  const handleSubmit = async (values) => {
    try {
      const body = { ...values };
      await importPortfolio(body).unwrap();
      setData({ ...body });
      setMsgShown({
        status: 'success',
        msg: 'Portfolio imported successfully',
      });
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
