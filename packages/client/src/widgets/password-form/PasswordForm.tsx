import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import { FormInputText } from '@/shared/form-fields/FormInputText';
import { passwordValidate, requiredValidate } from '@/utils/validate';
import { useApiCall } from '@/hooks/useApiCall';
import { userApi } from '@/services/api/user/user-api';
import { ChangePasswordData } from '@/types/user';

interface Props {
  canEdit: boolean;
}

export const PasswordForm: React.FC<Props> = ({ canEdit }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });
  const [changePassword] = useApiCall(userApi.changePassword);
  const [textError, setTextError] = useState('');

  const onSubmit = async (data: ChangePasswordData) => {
    const res = await changePassword(data);

    if (typeof res === 'string' && res === 'OK') {
      setTextError('');
      reset({
        oldPassword: '',
        newPassword: '',
      });
    } else {
      setTextError('Неверные данные');
    }
  };

  return (
    <>
      {textError && (
        <Alert severity="error">
          <AlertTitle>{textError}</AlertTitle>
        </Alert>
      )}
      {canEdit && (
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" gap={1}>
              <Typography component="h1" variant="h5">
                Сменить пароль
              </Typography>
              <Button type="submit" sx={{ marginLeft: 'auto' }}>
                Сохранить
              </Button>
            </Box>

            <FormInputText
              control={control}
              name="oldPassword"
              label="Старый пароль"
              type="password"
              autoComplete="current-password"
              rules={{
                ...requiredValidate,
                ...passwordValidate,
              }}
            />
            <FormInputText
              control={control}
              name="newPassword"
              label="Новый пароль"
              type="password"
              autoComplete="new-password"
              rules={{
                ...requiredValidate,
                ...passwordValidate,
              }}
            />
          </form>
        </Box>
      )}
    </>
  );
};
