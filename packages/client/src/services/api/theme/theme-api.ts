import { BaseApi } from '@/utils/api/base-api';
import { AxiosResponse } from 'axios';
import { ThemeResonse } from '@/types/theme/theme';

class ThemeApi extends BaseApi {
  constructor() {
    super('theme/');
  }

  getMode = () => this.http.get<undefined, AxiosResponse<ThemeResonse>>('mode');
  toggleMode = () =>
    this.http.post<undefined, AxiosResponse<ThemeResonse>>('toggleMode');
}

export const themeApi = new ThemeApi();
