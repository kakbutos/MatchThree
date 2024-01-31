import { OAuthData, OAuthResponse } from '@/types/oauth/oauth';
import { BaseApi } from '@/utils/api/base-api';
import { AxiosResponse } from 'axios';

class OAUTHApi extends BaseApi {
  constructor() {
    super('oauth/yandex');
  }

  getServiceId = (redirect_uri: string) =>
    this.http.get<undefined, AxiosResponse<OAuthResponse>>(
      `/service-id?redirect_uri=${redirect_uri}`
    );
  signinYandex = (data: OAuthData) =>
    this.http.post<OAuthData, AxiosResponse<OAuthResponse>>(``, data);
}

export const oauthApi = new OAUTHApi();
