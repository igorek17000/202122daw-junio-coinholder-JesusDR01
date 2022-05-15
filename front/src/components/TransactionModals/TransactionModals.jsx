import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import GenericModal from 'components/GenericModal';
import { Loader } from 'components/Loader/Loader';
import GenericDeleteModal from 'components/GenericDeleteModal';
import * as yup from 'yup';
import GenericForm from 'components/GenericForm';
import { useTranslation } from 'react-i18next';
import GenericErrorModal from 'components/GenericErrorModal';

export const TransactionModals = ({ row, transaction, hooks }) => {
  const { t } = useTranslation();
  const { useDeleteTransaction, useUpdateTransaction, notesTransactionModalState } = hooks;
  const {
    deleteTransactionModalState,
    handleDeleteTransaction,
    isDeletingTransaction,
    handleCloseDeleteTransactionModal,
    errorDeletingTransaction,
  } = useDeleteTransaction;

  const {
    updateTransactionModalState,
    handleUpdateTransaction,
    isUpdatingTransaction,
    errorUpdatingTransaction,
  } = useUpdateTransaction;
  const [error, setError] = useState(null);
  useEffect(() => {
    if (errorUpdatingTransaction || errorDeletingTransaction) {
      setError(errorUpdatingTransaction || errorDeletingTransaction);
    }
  }, [errorDeletingTransaction, errorUpdatingTransaction]);

  return (
    <>
      <GenericModal openState={deleteTransactionModalState}>
        <Box id="form-wrapper">
          {isDeletingTransaction ? (
            <Loader minHeight="45vh" />
          ) : (
            <GenericDeleteModal
              handleAction={handleDeleteTransaction}
              handleCloseModal={handleCloseDeleteTransactionModal}
              warningMessage={t('transactions.actions.deleteWarning')}
              action={t('transactions.actions.delete')}
            />
          )}
        </Box>
      </GenericModal>

      <GenericModal openState={notesTransactionModalState}>
        <Box id="notes-wrapper">
          <Typography component="h2">{t('forms.notes.label')}</Typography>
          <Typography>{row.notes}</Typography>
        </Box>
      </GenericModal>

      <GenericModal openState={updateTransactionModalState}>
        <Box id="form-wrapper">
          {isUpdatingTransaction ? (
            <Loader minHeight="45vh" />
          ) : (
            <GenericForm
              formInitialState={{
                investment: transaction.investment,
                entryPrice: transaction.entryPrice,
                notes: transaction.notes,
              }}
              handleSubmit={handleUpdateTransaction}
              formTemplate={[
                {
                  name: 'investment',
                  label: t('forms.investment.label'),
                  type: 'number',
                },
                {
                  name: 'entryPrice',
                  label: t('forms.entryPrice.label'),
                  type: 'number',
                },
                {
                  name: 'notes',
                  label: t('forms.notes.label'),
                  type: 'textArea',
                },
                {
                  name: 'type',
                  label: t('forms.type.label'),
                  type: 'radio',
                  defaultChecked: transaction.type,
                  radioOptions: [
                    {
                      value: 'buy',
                      label: t('forms.type.options.buy'),
                      selected: transaction.type === 'buy',
                    },
                    {
                      value: 'sell',
                      label: t('forms.type.options.sell'),
                      selected: transaction.type === 'sell',
                    },
                  ],
                },
              ]}
              validationSchema={yup.object({
                investment: yup.number().positive(t('validations.errors.positive')),
                entryPrice: yup.number().positive(t('validations.errors.positive')),
                notes: yup.string(),
              })}
            >
              {t('transactions.actions.update')}
            </GenericForm>
          )}
        </Box>
      </GenericModal>
      {<GenericErrorModal error={error} />}
    </>
  );
};
