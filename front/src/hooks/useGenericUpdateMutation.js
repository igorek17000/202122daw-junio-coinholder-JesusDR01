import { handleRequestErrors } from '../helpers/handleRequestErrors';
import { useState } from 'react';
export const useGenericUpdateMutation = ({ mutationFunction, formInitialState }) => {
  const msgShownInitialState = {
    status: '',
    msg: '',
  };
  const [msgShown, setMsgShown] = useState(msgShownInitialState);

  const [data, setData] = useState(formInitialState);

  const handleSubmit = async (values) => {
    try {
      const body = { ...values };
      await mutationFunction(body).unwrap();
      setData({ ...body });
      setMsgShown({
        status: 'success',
        msg: 'Updated successfully',
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
