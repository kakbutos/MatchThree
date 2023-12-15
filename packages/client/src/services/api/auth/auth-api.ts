import { BaseApi } from '../../../utils/base-api';
import { AuthRequest } from '../../../types/auth-request';
import { SignupRequest } from '../../../types/signup-request';

class AuthApi extends BaseApi {
  constructor() {
    super('auth/');
  }

  signIn = (data: AuthRequest) =>
    this.http.post<AuthRequest, string>('signin', data, {
      withCredentials: false,
    });
  signUp = (data: SignupRequest) =>
    this.http.post<SignupRequest, { id: string }>('signup', data, {
      withCredentials: false,
    });
  logout = () => this.http.post<undefined, string>('logout');
  getCurrent = () => this.http.get<undefined, string>('user');
}

export const authApi = new AuthApi();
