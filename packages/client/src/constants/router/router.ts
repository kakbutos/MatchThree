export enum AppRoutes {
  MAIN = 'main',
  LOGIN = 'login',
  REGISTRATION = 'reg',
  PROFILE = 'profile',
  GAME = 'game',
  LEADER_BOARD = 'Leader_board',
  FORUM = 'forum',
  FORUM_TOPIC = 'forum_topic',
  NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteLogin = () => '/login';
export const getRouteRegistration = () => '/reg';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteGame = () => '/game';
export const getRouteLeaderBoard = () => 'leaderboard';
export const getRouteForum = () => '/forum';
export const getRouteForumTopic = (id: string) => `/forum/topic/${id}`;
