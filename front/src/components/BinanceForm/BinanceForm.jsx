import { StyledBinanceForm } from './BinanceForm.styled';
import React from 'react';
import { Button, TextField } from '@mui/material';
import * as yup from 'yup';

export const BinanceForm = ({ formInitialState: { apiKey, apiSecret }, handleSubmit, children }) => {
  const validationSchema = yup.object({
    apiKey: yup.string().required('Api key is required'),
    apiSecret: yup.string().required('Api secret is required'),
  });
  return (
    <StyledBinanceForm
      initialValues={{ apiKey, apiSecret }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {({ values, handleChange, submitForm, handleBlur, touched, errors }) => (
        <>
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
    </StyledBinanceForm>
  );
};
