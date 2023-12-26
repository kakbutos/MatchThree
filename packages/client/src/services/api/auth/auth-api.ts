import { BaseApi } from '@/utils/api/base-api';
import { AuthRequest, SignupRequest, SignupResponse } from '@/types/auth/auth';
import { User } from '@/types/user';
import { AxiosResponse } from 'axios';

class AuthApi extends BaseApi {
  constructor() {
    super('auth/');
  }

  signIn = (data: AuthRequest) =>
    this.http.post<AuthRequest, AxiosResponse<string>>('signin', data);
  signUp = (data: SignupRequest) =>
    this.http.post<SignupRequest, AxiosResponse<SignupResponse>>(
      'signup',
      data
    );
  logout = () => this.http.post<undefined, AxiosResponse<string>>('logout');
  getCurrent = () => this.http.get<undefined, AxiosResponse<User>>('user');
}

export const authApi = new AuthApi();
