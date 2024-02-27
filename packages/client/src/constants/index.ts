// const isDev = __NODE_ENV__ === 'development';
const isDev = false;
const IP = '51.250.109.189';

export const API_URL = 'https://ya-praktikum.tech/api/v2';
export const SERVER_API_URL = isDev
  ? `http://localhost:${__SERVER_PORT__}`
  : `http://${IP}`;
export const getResourceLink = (link: string) => `${API_URL}/resources${link}`;
export const TEAM_NAME = 'CodeFather';
export const RATING_FIELD_NAME = 'score';
