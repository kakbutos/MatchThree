export type OAuthResponse = {
  service_id: string;
};
export type OAuthData = {
  code: string;
  redirect_uri: string;
};

export const isOAuthResponse = (value: unknown): value is OAuthData => {
  return !!value && !!(value as OAuthData)?.code;
};

export const isOAuthServiceId = (value: unknown): value is OAuthResponse => {
  return !!value && !!(value as OAuthResponse)?.service_id;
};
