import React from 'react';
import { ImageLayout } from '@/widgets/image-layout';
import Racket from '@/assets/images/racket.svg?react';
import { ProfileForm } from '@/widgets/profile-form/ProfileForm';
import { Spinner } from '@/shared/spinner/Spinner';
import { UserStore } from '@/store/user';
import { useAppSelector } from '@/hooks/useAppSelector';

export const Profile: React.FC = () => {
  const isLoading = useAppSelector(UserStore.selectors.selectIsLoading);

  return (
    <ImageLayout BackgroundImage={Racket}>
      {isLoading && <Spinner />}
      <ProfileForm />
    </ImageLayout>
  );
};
