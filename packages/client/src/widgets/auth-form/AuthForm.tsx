import { Typography, Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useApiCall } from '@/hooks/useApiCall';
import { authApi } from '@/services/api/auth/auth-api';
import styles from './auth-form.module.scss';
import { Spinner } from '@/shared/spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { getRouteMain, getRouteRegistration } from '@/constants/router/router';
import { FormInputText } from '@/shared/form-fields/FormInputText';
import { AuthRequest } from '@/types/auth/auth';
import { fetchCurrentUser } from '@/store/user/slice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { OAuthButton } from './OAuth-button';

export const AuthForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<AuthRequest>({
    defaultValues: {
      login: '',
      password: '',
    },
  });
  const navigate = useNavigate();
  const [signin, isLoading] = useApiCall(authApi.signIn);

  const onSubmit = async (data: AuthRequest) => {
    const res = await signin(data);
    if (typeof res === 'string' && res === 'OK') {
      dispatch(fetchCurrentUser());
      navigate(getRouteMain(), {
        replace: true,
      });
    }
  };

  const goToReg = () => {
    navigate(getRouteRegistration(), {
      replace: true,
    });
  };

  return (
    <Box position="relative">
      {isLoading && <Spinner />}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formFields}>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <Box>
          <FormInputText
            control={control}
            name="login"
            label="Логин"
            autoFocus
            disabled={isLoading}
            rules={{
              required: 'Поле обязательно для заполнения',
            }}
          />
          <FormInputText
            control={control}
            name="password"
            label="Пароль"
            type="password"
            disabled={isLoading}
            rules={{
              required: 'Поле обязательно для заполнения',
            }}
          />
        </Box>
        <Box display="flex" gap={1}>
          <OAuthButton disabled={isLoading} />
          <Button type="submit" disabled={isLoading}>
            Авторизоваться
          </Button>
          <Button variant="outlined" disabled={isLoading} onClick={goToReg}>
            Нет аккаунта?
          </Button>
        </Box>
      </form>
    </Box>
  );
};
