import {
  AppRoutes,
  getRouteMain,
  getRouteLogin,
  getRouteRegistration,
  getRouteProfile,
  getRouteGame,
  getRouteLeaderBoard,
  getRouteForum,
  getRouteForumTopic,
} from '../../constants/router/router';
import { AppRoutesProps } from '../../types/router/router';
import { LoginPage } from '../../pages/login';
import { ErrorPage } from '../../pages/error/ErrorPage';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <></>,
  },
  [AppRoutes.LOGIN]: {
    path: getRouteLogin(),
    element: <LoginPage />,
  },
  [AppRoutes.REGISTRATION]: {
    path: getRouteRegistration(),
    element: <></>,
  },
  [AppRoutes.PROFILE]: {
    path: getRouteProfile(':id'),
    element: <></>,
  },
  [AppRoutes.GAME]: {
    path: getRouteGame(),
    element: <></>,
  },
  [AppRoutes.LEADER_BOARD]: {
    path: getRouteLeaderBoard(),
    element: <></>,
  },
  [AppRoutes.FORUM]: {
    path: getRouteForum(),
    element: <></>,
  },
  [AppRoutes.FORUM_TOPIC]: {
    path: getRouteForumTopic(':id'),
    element: <></>,
  },

  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <ErrorPage text={'Страница не найдена'} showReloadBtn={false} />,
  },
};
