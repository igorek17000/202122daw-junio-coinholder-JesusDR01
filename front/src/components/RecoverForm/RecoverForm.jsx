import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import {StyledRecoverForm} from './RecoverForm.styled'
import { useTranslation } from 'react-i18next';
export const RecoverForm = ({ handleSubmit, initialValues }) => {
  const { t } = useTranslation();
  const validationSchema = yup.object({
    password: yup
      .string()
      .min(8, t('validations.errors.min.password'))
      .required(t('validations.errors.required.password')),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {({ values, handleChange, submitForm, handleBlur, touched, errors }) => (
        <StyledRecoverForm>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label={t('forms.password.label')}
                id="password"
                autoComplete="off"
                type={'password'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                name="confirmPassword"
                label={t('forms.confirmPassword.label')}
                id="confirmPassword"
                autoComplete="off"
                type={'password'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
            </Grid>
          </Grid>

          <Button
            onClick={submitForm}
            type="submit"
            fullWidth
            variant="contained"
          >
            {t('recover.action')}
          </Button>
        </StyledRecoverForm>
      )}
    </Formik>
  );
};
