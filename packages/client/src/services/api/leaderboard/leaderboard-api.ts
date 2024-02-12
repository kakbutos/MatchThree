import { TEAM_NAME } from '@/constants';
import {
  GetLeaderboardRequest,
  GetLeaderboardResponse,
  UpdateLeaderboardRequest,
} from '@/types/leaderboard/leaderboard';
import { BaseApi } from '@/utils/api/base-api';
import { AxiosResponse } from 'axios';

class LeaderboardApi extends BaseApi {
  constructor() {
    super('leaderboard/');
  }

  updateLeaderboard = (data: UpdateLeaderboardRequest) =>
    this.http.post<UpdateLeaderboardRequest, AxiosResponse<string>>('', data);

  getLeaderboard = (data: GetLeaderboardRequest) =>
    this.http.post<
      GetLeaderboardRequest,
      AxiosResponse<GetLeaderboardResponse[]>
    >(TEAM_NAME, data);
}

export const leaderboardApi = new LeaderboardApi();
