import React from 'react';
import { StyledKucoinForm } from './KucoinForm.styled';
import { Button, TextField } from '@mui/material';
import * as yup from 'yup';

export const KucoinForm = ({
  formInitialState: { apiKey, apiSecret, passphrase },
  handleSubmit,
  children
}) => {
  const validationSchema = yup.object({
    passphrase: yup.string().required('Passphrase is required'),
    apiKey: yup.string().required('Api key is required'),
    apiSecret: yup.string().required('Api secret is required'),
  });
  return (
    <StyledKucoinForm
      initialValues={{ apiKey, apiSecret, passphrase }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {({ values, handleChange, submitForm, handleBlur, touched, errors }) => (
        <>
          <TextField
            margin="normal"
            autoComplete="off"
            fullWidth
            id="passphrase"
            type="password"
            name="passphrase"
            label="Passphrase"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.passphrase}
            error={touched.passphrase && Boolean(errors.passphrase)}
            helperText={touched.passphrase && errors.passphrase}
          />

          <TextField
            margin="normal"
            type="password"
            autoComplete="off"
            fullWidth
            id="apiKey"
            name="apiKey"
            label="Api key"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.apiKey}
            error={touched.apiKey && Boolean(errors.apiKey)}
            helperText={touched.apiKey && errors.apiKey}
          />

          <TextField
            margin="normal"
            type="password"
            autoComplete="off"
            fullWidth
            id="apiSecret"
            name="apiSecret"
            label="Api secret"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.apiSecret}
            error={touched.apiSecret && Boolean(errors.apiSecret)}
            helperText={touched.apiSecret && errors.apiSecret}
          />

          <Button type="submit" onClick={submitForm} fullWidth variant="contained">
            {children}
          </Button>
        </>
      )}
    </StyledKucoinForm>
  );
};
