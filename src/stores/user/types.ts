export type User = {
  id: number;
  login: string;
  email: string;
  roles: Array<string>;
};

export type loginUserParams = {
  login: string;
  password: string;
};

export type AuthResponse = {
  access_token: string;
  user: User;
};

export type registerUserParams = {
  login: string;
  email: string;
  password: string;
  password_confirmation: string;
};
