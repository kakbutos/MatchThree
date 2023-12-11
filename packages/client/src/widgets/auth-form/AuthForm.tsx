import { Typography, TextField, Box, Button } from '@mui/material';
import { FormEvent } from 'react';
import { useApiCall } from '../../hooks/useApiCall';
import { authApi } from '../../services/api/auth/auth-api';
import styles from './auth-form.module.scss';
import { Spinner } from '../../shared/components/spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { getRouteMenu } from '../../constants/router/router';
import { AuthService } from '../../services/auth/auth';

export const AuthForm = () => {
  const navigate = useNavigate();
  const [signin, isLoading] = useApiCall(authApi.signIn);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const res = await signin({
      login: data.get('login') as string,
      password: data.get('password') as string,
    });
    if (typeof res === 'string' && res === 'OK') {
      AuthService.setLogged();
      navigate(getRouteMenu(), {
        replace: true,
      });
    }
  };

  return (
    <Box position="relative">
      {isLoading && <Spinner />}
      <form noValidate onSubmit={handleSubmit} className={styles.formFields}>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="login"
          label="Логин"
          name="login"
          autoComplete="login"
          autoFocus
          disabled={isLoading}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Пароль"
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isLoading}
        />
        <Box display="flex" gap={1}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}>
            Авторизоваться
          </Button>
          <Button
            type="submit"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}>
            Нет аккаунта?
          </Button>
        </Box>
      </form>
    </Box>
  );
};
