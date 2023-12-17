import React, { createContext, useEffect, useState } from 'react';
import { ImageLayout } from '@/widgets/image-layout';
import Racket from '@/assets/images/racket.svg?react';
import { ProfileForm } from '@/widgets/profile-form/ProfileForm';
import { useApiCall } from '@/hooks/useApiCall';
import { authApi } from '@/services/api/auth/auth-api';
import { Spinner } from '@/shared/spinner/Spinner';
import { User } from '@/types/user';

// TODO DELETE
export const AuthUserContext = createContext({} as any);

export const Profile: React.FC = () => {
  const [authUser, setAuthUser] = useState<User | Record<string, never>>({});
  const [authUserApi, isLoading] = useApiCall(authApi.getCurrent);

  // TODO DELETE - потом при ините страницы эти данные в redux будут
  useEffect(() => {
    const getAuthUser = async () => {
      const res = await authUserApi();
      if (res?.id) {
        setAuthUser(res);
      }
    };

    getAuthUser();
  }, []);

  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
      {isLoading && <Spinner />}
      <ImageLayout BackgroundImage={Racket}>
        <ProfileForm />
      </ImageLayout>
    </AuthUserContext.Provider>
  );
};
