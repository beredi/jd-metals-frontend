import { User } from "./User";
export type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  AccessToken: string;
  User: User;
};
