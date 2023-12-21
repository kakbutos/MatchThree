import { BaseApi } from '@/utils/api/base-api';
import { ChangePasswordData, ChangeProfileData, User } from '@/types/user';
import { AxiosResponse } from 'axios';

class UserApi extends BaseApi {
  constructor() {
    super('user/');
  }

  getUser = (id: number) =>
    this.http.get<undefined, AxiosResponse<User>>(String(id));

  changeProfile = (data: ChangeProfileData) =>
    this.http.put<ChangeProfileData, AxiosResponse<User>>('profile', data);

  changePassword = (data: ChangePasswordData) =>
    this.http.put<ChangePasswordData, AxiosResponse<string | object>>(
      'password',
      data
    );

  changeAvatar = (data: FormData) =>
    this.http.put<FormData, AxiosResponse<User>>('profile/avatar', data);
}

export const userApi = new UserApi();
