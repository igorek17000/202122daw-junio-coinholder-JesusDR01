import { Box, Button } from '@mui/material';
import { StyledTransactionActions } from './TransactionActions.styled';
import { useCreateTransaction } from 'hooks/transaction/useCreateTransaction';
import GenericModal from 'components/GenericModal';
import GenericForm from 'components/GenericForm';
import { Loader } from 'components/Loader/Loader';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import {GenericErrorModal} from 'components/GenericErrorModal/GenericErrorModal';
import { cfg } from 'config/config';
export function TransactionActions({ idCoin }) {
  const { t } = useTranslation();

  const {
    createTransactionModalState,
    handleCreateTransaction,
    isCreatingTransaction,
    handleOpenCreateTransactionModal,
    errorCreatingTransaction
  } = useCreateTransaction({ idCoin });
  return (
    <StyledTransactionActions>
      <Button
        variant="contained"
        className="btn-styled"
        onClick={() => handleOpenCreateTransactionModal('sell')}
      >
        {t('transactions.actions.sell')}
      </Button>
      <Button
        variant="contained"
        className="btn-styled"
        onClick={() => handleOpenCreateTransactionModal('buy')}
      >
        {t('transactions.actions.buy')}
      </Button>

      <GenericModal openState={createTransactionModalState}>
        <Box id="form-wrapper">
          {isCreatingTransaction ? (
            <Loader minHeight="45vh" />
          ) : (
            <GenericForm
              formInitialState={{ investment: cfg.defaultDevValues.transaction.investment, entryPrice: cfg.defaultDevValues.transaction.entryPrice, notes: '' }}
              handleSubmit={handleCreateTransaction}
              formTemplate={[
                {
                  name: 'investment',
                  label: t('forms.investment.label'),
                  type: 'number',
                  placeholder: '100',
                },
                { name: 'entryPrice', label:t('forms.entryPrice.label'), type: 'number', placeholder: '100' },
                { name: 'notes', label:t('forms.notes.label'), type: 'textArea' },
              ]}
              validationSchema={yup.object({
                investment: yup.string().required(t('validations.errors.required.investment')),
                entryPrice: yup.string().required(t('validations.errors.required.entryPrice')),
              })}
            >
              {t('transactions.actions.create')}
            </GenericForm>
          )}
        </Box>
      </GenericModal>
      <GenericErrorModal error={errorCreatingTransaction}/>
    </StyledTransactionActions>
  );
}
