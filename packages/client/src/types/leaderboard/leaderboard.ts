import { RATING_FIELD_NAME } from '@/constants';

export interface UpdateLeaderboardRequest {
  data: LeaderboardData;
  ratingFieldName: string;
  teamName: string;
}

export type LeaderboardData = {
  userName: string;
  [RATING_FIELD_NAME]: number;
  gameMode: string;
  avatar: string;
};

export interface GetLeaderboardRequest {
  ratingFieldName: string;
  cursor: number;
  limit: number;
}

export interface GetLeaderboardResponse {
  data: LeaderboardData;
}

export const isGetLeaderboardResponse = (
  value: unknown
): value is GetLeaderboardResponse[] => {
  return !!value;
};
