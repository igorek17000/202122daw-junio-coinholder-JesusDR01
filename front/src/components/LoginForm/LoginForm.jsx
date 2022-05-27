import { useState } from 'react';
import { Button, FormControlLabel, Checkbox, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import ActionButton from 'components/ActionButton';


export function LoginForm({ formInitialState: { email, password }, handleSubmit }) {
  const { t } = useTranslation();
  const [passwordShown, setPasswordShown] = useState(false);
  const validationSchema = yup.object({
    email: yup
      .string()
      .email(t('validations.errors.email'))
      .required(t('validations.errors.required.email')),
    password: yup.string().required(t('validations.errors.required.password')),
  });
  
  return (
    <Formik
      initialValues={{ email, password }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {({ values, handleChange, submitForm, handleBlur, touched, errors }) => (
        <>
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

          <TextField
            margin="normal"
            fullWidth
            name="password"
            label={t('forms.password.label')}
            id="password"
            autoComplete="off"
            placeholder={t('forms.password.placeHolder')}
            type={passwordShown ? 'text' : 'password'}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />

          <FormControlLabel
            control={
              <Checkbox
                onClick={() => setPasswordShown((passwordShown) => !passwordShown)}
                value="show"
                color="primary"
              />
            }
            label={t('forms.password.show')}
          />

          <ActionButton
            type="submit"
            onClick={submitForm}
            fullWidth
            variant="contained"
        
          >
            {t('login.action')}
          </ActionButton>
        </>
      )}
    </Formik>
  );
}
