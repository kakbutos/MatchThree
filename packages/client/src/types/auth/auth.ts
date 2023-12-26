export interface AuthRequest {
  password: string;
  login: string;
}

export interface SignupRequest {
  password: string;
  login: string;
  phone: string;
  email: string;
  first_name: string;
  second_name: string;
}

export interface SignupResponse {
  id: number;
}

export const isSignupResponse = (value: unknown): value is SignupResponse => {
  return !!value && !!(value as SignupResponse)?.id;
};
