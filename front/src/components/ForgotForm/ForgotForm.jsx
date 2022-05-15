import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

import { useTranslation } from 'react-i18next';
export const ForgotForm = ({ handleSubmit, initialValues }) => {
    const { t } = useTranslation();
  const validationSchema = yup.object({
    email: yup.string().email(t('validations.errors.email')).required(t('validations.errors.required.email')),
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
    > 
      {({ values, handleChange, submitForm, handleBlur, touched, errors }) => (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                fullWidth
                id="email"
                name="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
          </Grid>

          <Button
            onClick={submitForm}
            type="submit"
            fullWidth
            variant="contained"
          >
             {t('forgot.action')}
          </Button>
        </>
      )}
    </Formik>
  );
};
