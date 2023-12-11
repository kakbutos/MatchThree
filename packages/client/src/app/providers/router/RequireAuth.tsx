import { Navigate } from 'react-router-dom';
import { getRouteLogin } from '../../../constants/router/router';
import { AuthService } from '../../../services/auth/auth';

interface RequireAuthProps {
  children: JSX.Element;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const isLogged = AuthService.isLogged();

  if (!isLogged) {
    return <Navigate to={getRouteLogin()} replace />;
  }

  return children;
}
