import React from 'react';
import { ImageLayout } from '@/widgets/image-layout';
import Racket from '@/assets/images/racket.svg?react';
import { RegistrationForm } from '../../widgets/registration-form';

export const RegistrationPage: React.FC = () => (
  <ImageLayout BackgroundImage={Racket}>
    <RegistrationForm />
  </ImageLayout>
);
