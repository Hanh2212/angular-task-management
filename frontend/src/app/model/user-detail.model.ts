export interface LoginPayload {
  username: string;
  password: string;
}

export class UserDetail {
  username?: string;
  accessToken?: string;
}
