import { FormEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import styles from './login.module.scss';
import { Box } from '@mui/material';
import { ImageLayout } from '../../widgets/image-layout';

export const LoginPage = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      login: data.get('login'),
      password: data.get('password'),
    });
  };

  return (
    <ImageLayout urlBackgroundImage="/src/assets/images/racket.svg">
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
        />
        <Box display="flex" gap={1}>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Авторизоваться
          </Button>
          <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }}>
            Нет аккаунта?
          </Button>
        </Box>
      </form>
    </ImageLayout>
  );
};
