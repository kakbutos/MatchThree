import { BaseApi } from '@/utils/api/base-api';
import { ChangePasswordData, ChangeProfileData, User } from '@/types/user';

class UserApi extends BaseApi {
  constructor() {
    super('user/');
  }

  getUser = (id: number) => this.http.get<undefined, User>(`${id}`);

  changeProfile = (data: ChangeProfileData) =>
    this.http.put<ChangeProfileData, User>('profile', data);

  changePassword = (data: ChangePasswordData) =>
    this.http.put<ChangePasswordData, string | object>('password', data);

  changeAvatar = (data: FormData) =>
    this.http.put<FormData, User>('profile/avatar', data);
}

export const userApi = new UserApi();
