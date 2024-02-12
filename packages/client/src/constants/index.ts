export const API_URL = 'https://ya-praktikum.tech/api/v2';
export const SERVER_API_URL = `http://localhost:3001`;
// export const SERVER_API_URL =
//   process.env.NODE_ENV === 'development'
//     ? 'localhost:' + (process.env.SERVER_PORT || 3001)
//     : '';
export const getResourceLink = (link: string) => `${API_URL}/resources${link}`;
export const TEAM_NAME = 'CodeFather';
export const RATING_FIELD_NAME = 'score';
