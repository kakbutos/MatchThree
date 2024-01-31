import { useApiCall } from '@/hooks/useApiCall';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { oauthApi } from '@/services/api/oauth/oauth-api';
import { fetchCurrentUser } from '@/store/user/slice';
import { isOAuthServiceId } from '@/types/oauth/oauth';
import { Button } from '@mui/material';
import { useEffect } from 'react';

type OAuthProps = { disabled: boolean };

const yandexSvg = (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
    <path
      d="M15.1299 5.86377H13.4936C10.5001 5.86377 8.91448 7.24059 8.91448 9.26532C8.91448 11.5677 10.0054 12.6437 12.2505 14.009L14.1025 15.1312L8.77495 22.3508H4.80469L9.58676 15.8949C6.83422 14.1247 5.2867 12.4008 5.2867 9.46201C5.2867 5.78278 8.10267 3.28369 13.4682 3.28369H18.7958V22.3624H15.1299V5.86377Z"
      fill="#ff0000"
    />
  </svg>
);

const redirect_uri = 'http://localhost:3000/login';
const getOAuthLink = (id: string) =>
  `https://oauth.yandex.ru/authorize?response_type=code&client_id=${id}&redirect_uri=${redirect_uri}`;

export const OAuthButton = ({ disabled }: OAuthProps) => {
  const [serviceId, isLoading] = useApiCall(oauthApi.getServiceId);

  const handleClick = async () => {
    const res = await serviceId(redirect_uri);
    if (isOAuthServiceId(res) && res?.service_id) {
      window.location.href = getOAuthLink(res.service_id);
    }
  };

  const [signin] = useApiCall(oauthApi.signinYandex);
  const dispatch = useAppDispatch();

  const signInFunc = async (code: string) => {
    const res = await signin({
      code: code,
      redirect_uri: redirect_uri,
    });

    if (typeof res === 'string' && res === 'OK') {
      dispatch(fetchCurrentUser());
    }
  };

  useEffect(() => {
    const code = window.location.search.slice(1).split('=');
    if (code[0] === 'code') signInFunc(code[1]);
  }, []);

  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      disabled={disabled || isLoading}>
      {yandexSvg}
    </Button>
  );
};
