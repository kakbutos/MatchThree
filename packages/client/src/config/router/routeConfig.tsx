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
  getRouteMenu,
} from '../../constants/router/router';
import { AppRoutesProps } from '../../types/router/router';
import { LoginPage } from '../../pages/login';
import { MenuPage } from '../../pages/menu';
import { ErrorPage } from '../../pages/error/ErrorPage';
import { GamePage } from '@/pages/game';

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
    authOnly: true,
  },
  [AppRoutes.GAME]: {
    path: getRouteGame(),
    element: <GamePage />,
    authOnly: true,
  },
  [AppRoutes.LEADER_BOARD]: {
    path: getRouteLeaderBoard(),
    element: <></>,
    authOnly: true,
  },
  [AppRoutes.FORUM]: {
    path: getRouteForum(),
    element: <></>,
    authOnly: true,
  },
  [AppRoutes.MENU]: {
    path: getRouteMenu(),
    element: <MenuPage />,
    authOnly: true,
  },
  [AppRoutes.FORUM_TOPIC]: {
    path: getRouteForumTopic(':id'),
    element: <></>,
    authOnly: true,
  },

  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <ErrorPage text={'Страница не найдена'} showNavigateBtn={true} />,
  },
};
