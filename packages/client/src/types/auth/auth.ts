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
