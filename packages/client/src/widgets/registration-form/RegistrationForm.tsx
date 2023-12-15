import { Typography, Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useApiCall } from '@/hooks/useApiCall';
import { authApi } from '@/services/api/auth/auth-api';
import styles from './registration-form.module.scss';
import { Spinner } from '@/shared/components/spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { getRouteLogin, getRouteMenu } from '@/constants/router/router';
import { AuthService } from '@/services/auth/auth';
import { SignupRequest } from '@/types/signup-request';
import { FormInputText } from '@/shared/components/form-fields/FormInputText';
import {
  emailValidate,
  passwordValidate,
  phoneValidate,
  requiredValidate,
  maxLengthValidate,
  minLengthValidate,
  loginValidate,
  nameValidate,
} from '@/utils/validate';

interface RegistrationFormFields extends SignupRequest {
  confirm_password: string;
}

const INITIAL_VALUE = {
  first_name: '',
  second_name: '',
  login: '',
  email: '',
  phone: '',
  password: '',
  confirm_password: '',
};

export const RegistrationForm: React.FC = () => {
  const { handleSubmit, control, watch } = useForm<RegistrationFormFields>({
    defaultValues: INITIAL_VALUE,
  });
  const navigate = useNavigate();
  const [signup, isLoading] = useApiCall(authApi.signUp);

  const goToLogin = () => {
    navigate(getRouteLogin(), {
      replace: true,
    });
  };

  const onSubmit = async ({
    confirm_password,
    ...formValue
  }: RegistrationFormFields) => {
    const res = await signup(formValue);
    if (res?.id) {
      AuthService.setLogged();
      navigate(getRouteMenu(), {
        replace: true,
      });
    }
  };

  return (
    <Box position="relative">
      {isLoading && <Spinner />}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formFields}>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Box>
          <FormInputText
            control={control}
            name="first_name"
            label="Имя"
            autoFocus
            disabled={isLoading}
            rules={{
              ...requiredValidate,
              ...nameValidate,
            }}
          />
          <FormInputText
            control={control}
            name="second_name"
            label="Фамилия"
            disabled={isLoading}
            rules={{
              ...requiredValidate,
              ...nameValidate,
            }}
          />
          <FormInputText
            control={control}
            name="login"
            label="Логин"
            disabled={isLoading}
            rules={{
              ...requiredValidate,
              ...loginValidate,
              ...maxLengthValidate(20),
              ...minLengthValidate(3),
            }}
          />
          <FormInputText
            control={control}
            name="email"
            label="Email"
            disabled={isLoading}
            rules={{
              ...requiredValidate,
              ...emailValidate,
            }}
          />
          <FormInputText
            control={control}
            name="phone"
            label="Телефон"
            disabled={isLoading}
            rules={{
              ...requiredValidate,
              ...phoneValidate,
            }}
          />
          <FormInputText
            control={control}
            name="password"
            label="Пароль"
            disabled={isLoading}
            rules={{
              ...requiredValidate,
              ...passwordValidate,
            }}
            type="password"
          />
          <FormInputText
            control={control}
            name="confirm_password"
            label="Пароль (еще раз)"
            disabled={isLoading}
            rules={{
              ...requiredValidate,
              validate: (val: string) => {
                if (watch('password') != val) {
                  return 'Не совпадает с паролем';
                }
              },
            }}
            type="password"
          />
        </Box>
        <Box display="flex" gap={1}>
          <Button type="submit" disabled={isLoading}>
            Зарегистрироваться
          </Button>
          <Button variant="outlined" disabled={isLoading} onClick={goToLogin}>
            Отмена
          </Button>
        </Box>
      </form>
    </Box>
  );
};
