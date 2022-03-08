export interface LoginPayload {
  username: string;
  password: string;
}

export class UserDetail {
  id?: string;
  username?: string;
  accessToken?: string;
}
