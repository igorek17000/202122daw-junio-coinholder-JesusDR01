import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { StyledLoginActions } from './LoginActions.styled';
export const LoginActions = ({ children }) => {
  const { t } = useTranslation();

  return (
    <StyledLoginActions container>
      {children}
      <Grid item>{<Link to="/register">{t('login.actions.signUp')}</Link>}</Grid>
    </StyledLoginActions>
  );
};
