import { BaseApi } from '@/utils/api/base-api';
import { AuthRequest, SignupRequest } from '@/types/auth/auth';
import { User } from '@/types/user';

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
  getCurrent = () => this.http.get<undefined, User>('user');
}

export const authApi = new AuthApi();
