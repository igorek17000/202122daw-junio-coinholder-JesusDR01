import * as yup from 'yup';

export const getTransactionsInfo = (entity) => {
  const genericInputMetadata = (error, label) => ({
    validation: yup.string().required(error),
    type: 'text',
    label,
  });

  const rowMetadata = {
    idCoin: genericInputMetadata('Coin is required', 'Coin*'),
    investment: genericInputMetadata('Investment is required', 'Investment*'),
    entryPrice: {
      validation: yup.string().required('Entry price is required'),
      type: 'text',
      label: 'Entry price*',
    },
  };

  return {
    rowMetadata,
  };
};
