import React from 'react';
import { ImageLayout } from '@/widgets/image-layout';
import { AuthForm } from '@/widgets/auth-form';
import Racket from '@/assets/images/racket.svg?react';

export const LoginPage: React.FC = () => (
  <ImageLayout BackgroundImage={Racket}>
    <AuthForm />
  </ImageLayout>
);
