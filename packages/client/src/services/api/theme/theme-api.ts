import { ThemeRequest } from '@/types/theme/theme';
import { BaseServerApi } from '@/utils/api/base-api';
import { AxiosResponse } from 'axios';

class ThemeApi extends BaseServerApi {
  constructor() {
    super('api/');
  }

  getMode = (userId: number) =>
    this.http.get<number, AxiosResponse<ThemeRequest>>(`theme/${userId}`);

  toggleMode = (data: ThemeRequest) =>
    this.http.post<ThemeRequest, AxiosResponse<void>>('theme', data, {});
}

export const themeApi = new ThemeApi();
