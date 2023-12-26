import { Navigate } from 'react-router-dom';
import { getRouteLogin, getRouteMain } from '../../../constants/router/router';
import { UserStore } from '@/store/user';
import { Spinner } from '@/shared/spinner/Spinner';
import { useEffect } from 'react';
import { fetchCurrentUser } from '@/store/user/slice';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { LoadingStatus } from '@/types/loading-status';

interface RequireAuthProps {
  authOnly?: boolean;
  children: React.ReactElement | null;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({
  authOnly,
  children,
}) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(UserStore.selectors.selectStatus);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (status === LoadingStatus.LOADING) {
    return <Spinner />;
  }

  if (authOnly && status === LoadingStatus.FAILED) {
    return <Navigate to={getRouteLogin()} replace />;
  }

  if (!authOnly && status === LoadingStatus.SUCCEEDED) {
    return <Navigate to={getRouteMain()} replace />;
  }

  return children;
};
