import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';
import { FormInputText } from '@/shared/form-fields/FormInputText';
import { useForm } from 'react-hook-form';
import {
  emailValidate,
  phoneValidate,
  requiredValidate,
  maxLengthValidate,
  minLengthValidate,
  loginValidate,
  nameValidate,
} from '@/utils/validate';
import React, { useContext, useEffect, useState } from 'react';
import { useApiCall } from '@/hooks/useApiCall';
import { userApi } from '@/services/api/user/user-api';
import { ChangeProfileData, User } from '@/types/user';
import { useParams } from 'react-router-dom';
import { AuthUserContext } from '@/pages/profile/Profile';
import { AvatarForm } from '@/widgets/avatar-from/AvatarForm';
import { PasswordForm } from '@/widgets/password-form/PasswordForm';

const INITIAL_AUTH_USER = {
  first_name: '',
  second_name: '',
  login: '',
  display_name: '',
  email: '',
  phone: '',
};

const sanitizeObject = (obj: object) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === null ? '' : value,
    ])
  );

export const ProfileForm: React.FC = () => {
  const params = useParams();
  const userId = params.id;
  const [getUserApi] = useApiCall(userApi.getUser);
  const [userById, setUserById] = useState<User | Record<string, string>>({});

  const [showTip, setShowTip] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [changeProfile, isLoading] = useApiCall(userApi.changeProfile);

  const { authUser } = useContext(AuthUserContext);
  const { handleSubmit, control, reset } = useForm({
    defaultValues: INITIAL_AUTH_USER,
  });

  useEffect(() => {
    const getUserById = async () => {
      if (userId) {
        const res = await getUserApi(+userId);

        if (res?.id) {
          const data = sanitizeObject(res);
          setUserById(data);
          // заполняем данными форму
          reset(data);
        }
      }
    };
    getUserById();
  }, []);

  useEffect(() => {
    const isAuthUser = authUser && authUser?.id;

    if (isAuthUser && userId && authUser.id === +userId) {
      setCanEdit(true);
      reset({
        ...userById,
        phone: authUser.phone || '',
        email: authUser.email || '',
        login: authUser.login || '',
        display_name: authUser.display_name || '',
      });
    }
  }, [authUser]);

  const onSubmit = async (data: ChangeProfileData) => {
    delete data.second_name;
    const res = await changeProfile(data);
    if (res?.id) {
      setShowTip(true);
    }
  };

  return (
    <Box paddingX={5}>
      <AvatarForm icon={userById?.avatar} canEdit={canEdit} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" gap={1}>
          <Typography component="h3" variant="h5">
            {canEdit ? 'Редактировать профиль' : 'Профиль'}
          </Typography>
          {canEdit && (
            <Button type="submit" sx={{ marginLeft: 'auto' }}>
              Сохранить
            </Button>
          )}
        </Box>

        <Box>
          <FormInputText
            control={control}
            name="first_name"
            label="Имя"
            disabled={isLoading || !canEdit}
            rules={{
              ...requiredValidate,
              ...nameValidate,
            }}
          />
          <FormInputText
            control={control}
            name="second_name"
            label="Фамилия"
            disabled
            rules={{
              ...requiredValidate,
              ...nameValidate,
            }}
          />
          <FormInputText
            control={control}
            name="login"
            label="Логин"
            disabled={isLoading || !canEdit}
            rules={{
              ...requiredValidate,
              ...loginValidate,
              ...maxLengthValidate(20),
              ...minLengthValidate(3),
            }}
          />
          <FormInputText
            control={control}
            name="display_name"
            label="Имя в игре"
            disabled={isLoading || !canEdit}
            rules={{
              ...requiredValidate,
            }}
          />
          {canEdit && (
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
          )}
          {canEdit && (
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
          )}
        </Box>
      </form>

      <Snackbar
        open={showTip}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert
          onClose={() => setShowTip(false)}
          severity="success"
          sx={{ width: '100%' }}>
          Изображение успешно загружено
        </Alert>
      </Snackbar>

      <PasswordForm canEdit={canEdit} />
    </Box>
  );
};
