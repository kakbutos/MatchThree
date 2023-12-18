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
} from '@/constants/router/router';
import { AppRoutesProps } from '@/types/router/router';
import { LoginPage } from '@/pages/login';
import { ErrorPage } from '@/pages/error/ErrorPage';
import { Forum } from '@/pages/forum/Forum';
import { TopicPage } from '@/pages/topic/Topic';
import { GamePage } from '@/pages/game';
import { LeaderBoardPage } from '@/pages/leaderboard';
import { RegistrationPage } from '@/pages/registration';
import { MainPage } from '@/pages/main';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
    authOnly: true,
  },
  [AppRoutes.LOGIN]: {
    path: getRouteLogin(),
    element: <LoginPage />,
  },
  [AppRoutes.REGISTRATION]: {
    path: getRouteRegistration(),
    element: <RegistrationPage />,
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
    element: <LeaderBoardPage />,
    authOnly: true,
  },
  [AppRoutes.FORUM]: {
    path: getRouteForum(),
    element: <Forum />,
    authOnly: true,
  },
  [AppRoutes.FORUM_TOPIC]: {
    path: getRouteForumTopic(':id'),
    element: <TopicPage />,
    authOnly: true,
  },

  [AppRoutes.NOT_FOUND]: {
    path: '*',
    element: <ErrorPage text={'Страница не найдена'} showNavigateBtn={true} />,
  },
};
