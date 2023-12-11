import { BaseApi } from '../../../utils/base-api';
import { AuthRequest } from './types/auth-request';

class AuthApi extends BaseApi {
  constructor() {
    super('auth/');
  }

  signIn = (data: AuthRequest) =>
    this.http.post<AuthRequest, string>('signin', data);
  logout = () => this.http.post<undefined, string>('logout');
  getCurrent = () => this.http.get<undefined, string>('user');
}

export const authApi = new AuthApi();
