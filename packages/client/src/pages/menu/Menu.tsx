import { getRouteLogin } from '../../constants/router/router';
import { useApiCall } from '../../hooks/useApiCall';
import { authApi } from '../../services/api/auth/auth-api';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth/auth';

// TODO COD-14 Временная заглушка для меню с кнопкой для выхода из аккаунта
export const MenuPage = () => {
  const navigate = useNavigate();
  const [logout] = useApiCall(authApi.logout);
  const exit = async () => {
    await logout();
    AuthService.logout();
    navigate(getRouteLogin(), {
      replace: true,
    });
  };

  return (
    <Box>
      <Button onClick={exit}>Выйти</Button>
    </Box>
  );
};
