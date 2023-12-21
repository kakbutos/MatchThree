import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './RequireAuth';
import { routeConfig } from '@/config/router/routeConfig';
import { AppRoutesProps } from '@/types/router/router';
import { Spinner } from '@/shared/spinner/Spinner';

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = <Suspense fallback={<Spinner />}>{route.element}</Suspense>;

    return (
      <Route
        key={route.path}
        path={route.path}
        element={<RequireAuth authOnly={route.authOnly}>{element}</RequireAuth>}
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
