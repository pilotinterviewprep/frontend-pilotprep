import { string } from 'zod';

export type UserType = Record<string, any> | null;

export type AuthState = {
  user: UserType;
  loading: boolean;
};

export type AuthContextValue = {
  user: UserType;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  checkUserSession?: () => Promise<void>;
};

export interface IUser {
  first_name: string;
  last_name: string | null;
  username: string;
  email: string;
  role: string;
  profile_pic: string | null;
}

export const defaultUser: IUser = {
  first_name: '',
  last_name: null,
  username: '',
  email: '',
  role: '',
  profile_pic: null,
};
