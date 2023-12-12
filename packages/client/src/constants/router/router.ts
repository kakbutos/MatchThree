export enum AppRoutes {
  MAIN = '/',
  LOGIN = '/login',
  REGISTRATION = '/reg',
  PROFILE = '/profile',
  GAME = '/game',
  LEADER_BOARD = '/leaderboard',
  FORUM = '/forum',
  FORUM_TOPIC = '/forum/topic',
  MENU = '/menu',
  NOT_FOUND = '/not_found',
}

export const getRouteMain = () => AppRoutes.MAIN;
export const getRouteLogin = () => AppRoutes.LOGIN;
export const getRouteRegistration = () => AppRoutes.REGISTRATION;
export const getRouteProfile = (id: string) => `${AppRoutes.PROFILE}/${id}`;
export const getRouteGame = () => AppRoutes.GAME;
export const getRouteMenu = () => AppRoutes.MENU;
export const getRouteLeaderBoard = () => AppRoutes.LEADER_BOARD;
export const getRouteForum = () => AppRoutes.FORUM;
export const getRouteForumTopic = (id: string) =>
  `${AppRoutes.FORUM_TOPIC}/${id}`;
