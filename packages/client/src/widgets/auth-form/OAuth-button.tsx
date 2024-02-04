import { useApiCall } from '@/hooks/useApiCall';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { oauthApi } from '@/services/api/oauth/oauth-api';
import { fetchCurrentUser } from '@/store/user/slice';
import { isOAuthServiceId } from '@/types/oauth/oauth';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import YandexIcon from '@/assets/icons/yandex.svg?react';
import { useLocation } from 'react-router-dom';

type OAuthProps = { disabled: boolean };

const REDIRECT_URI = 'http://localhost:3000/login';
const getOAuthLink = (id: string) =>
  `https://oauth.yandex.ru/authorize?response_type=code&client_id=${id}&redirect_uri=${REDIRECT_URI}`;

export const OAuthButton = ({ disabled }: OAuthProps) => {
  const [serviceId, isLoading] = useApiCall(oauthApi.getServiceId);
  const [signin] = useApiCall(oauthApi.signinYandex);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleOAuthRedirect = async () => {
    const res = await serviceId(REDIRECT_URI);
    if (isOAuthServiceId(res)) {
      window.location.href = getOAuthLink(res.service_id);
    }
  };

  const signIn = async (code: string) => {
    const res = await signin({
      code: code,
      redirect_uri: REDIRECT_URI,
    });

    if (typeof res === 'string' && res === 'OK') {
      dispatch(fetchCurrentUser());
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    if (code) {
      signIn(code);
    }
  }, []);

  return (
    <Button
      variant="outlined"
      onClick={handleOAuthRedirect}
      disabled={disabled || isLoading}>
      <YandexIcon />
    </Button>
  );
};
