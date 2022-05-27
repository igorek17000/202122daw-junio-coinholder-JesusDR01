import { Button, TextField, Grid } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

import { useTranslation } from 'react-i18next';
import ActionButton from 'components/ActionButton';
export function SignUpForm({ formInitialState, handleSubmit }) {
  const { t } = useTranslation();

  const validationSchema = yup.object({
    name: yup.string().required(t('validations.errors.required.userName')),
    email: yup
      .string()
      .email(t('validations.errors.email'))
      .required(t('validations.errors.required.email')),
    password: yup
      .string()
      .min(8, t('validations.errors.min.password'))
      .required(t('validations.errors.required.password')),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], t('validations.errors.passwordConfirmation')),
  });
  return (
    <Formik
      initialValues={formInitialState}
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
                name="name"
                fullWidth
                id="name"
                label={t('forms.nickName.label')}
                autoFocus
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>

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
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label={t('forms.password.label')}
                id="password"
                autoComplete="off"
                placeholder="Enter password"
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
                name="passwordConfirmation"
                label={t('forms.confirmPassword.label')}
                id="passwordConfirmation"
                autoComplete="off"
                placeholder="Confirm password"
                type={'password'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirmation}
                error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
                helperText={touched.passwordConfirmation && errors.passwordConfirmation}
              />
            </Grid>
          </Grid>

          <ActionButton onClick={submitForm} type="submit" fullWidth variant="contained">
            {t('register.action')}
          </ActionButton>
        </>
      )}
    </Formik>
  );
}
