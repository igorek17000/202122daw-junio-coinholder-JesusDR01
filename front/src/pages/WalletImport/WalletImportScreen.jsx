//@ts-check
import React, { useEffect } from 'react';
import { StyledWalletImportScreen } from './WalletImportScreen.styled';
import { Box, Button } from '@mui/material';
import { Typography } from 'antd';
import { GenericModal } from 'components';
import { Loader } from 'components/Loader/Loader';
import Snack from 'components/Snack/Snack';
import { useImport } from 'hooks/useImport';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCreateWalletPortfolioMutation } from 'app/services/wallet';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import GenericForm from 'components/GenericForm';
import { useMoralis } from 'react-moralis';
export const WalletImportScreen = () => {
  const { t } = useTranslation();

  const openState = useState(false);
  const [, setOpenModal] = openState;
  const { user, isAuthenticated } = useMoralis();
  const [address, setAddress] = useState();
  useEffect(() => {
    if (isAuthenticated) {
      setAddress(user.attributes.ethAddress);
    }
  }, [isAuthenticated]);

  const [createWalletPortfolio, { isLoading: isCreating }] = useCreateWalletPortfolioMutation();
  const dataInitialState = {
    title: '',
    address: '',
  };

  const { data, msgShown, setMsgShown, handleSubmit } = useImport({
    formInitialState: dataInitialState,
    importPortfolio: createWalletPortfolio,
  });
  return (
    <StyledWalletImportScreen className="animate__animated animate__fadeIn">
      <Link to="/import">
        <Button variant="outlined" id="back">
          {t('import.back')}
        </Button>
      </Link>
      <>
        <Box id="info">
          <Typography
            // @ts-ignore
            component="h3"
          >
            {t('walletImport.info')}
          </Typography>
        </Box>
        {isCreating ? (
          <Loader minHeight="45vh" />
        ) : (
          <GenericForm
            formInitialState={{ address: address || '', title: '' }}
            handleSubmit={handleSubmit}
            formTemplate={[
              {
                name: 'title',
                label: t('forms.wallet.label'),
                type: 'text',
                placeholder: t('forms.walletPortfolioTitle.placeholder'),
              },
              {
                name: 'address',
                label: t('forms.address.label'),
                type: 'text',
                placeholder: '0x29A9Ca033Fd565807d86AB8265eE937DC34f55F8',
              },
            ]}
            validationSchema={yup.object({
              title: yup.string().required(t('validations.errors.required.wallet')),
              address: yup.string().required(t('validations.errors.required.address')),
            })}
          >
            {t('walletImport.action')}
          </GenericForm>
        )}
      </>
      <Snack severity={msgShown.status} msgShown={msgShown.msg} setMsgShown={setMsgShown} />
    </StyledWalletImportScreen>
  );
};
