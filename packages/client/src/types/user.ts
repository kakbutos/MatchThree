export interface User {
  id: number;
  avatar: string;

  first_name: string;
  second_name?: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export type ChangeProfileData = Omit<User, 'id' | 'avatar'>;
export type ChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

export const isUserResponse = (value: unknown): value is User => {
  return !!value && !!(value as User)?.id;
};
