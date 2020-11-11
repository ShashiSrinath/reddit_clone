import { setCookie } from 'nookies';

export type AuthStateLoggedIn = {
  isLoggedIn: true;
  token: string;
  username: string;
  userId: number;
  karma: number;
};

export type AuthState =
  | {
      isLoggedIn: false;
    }
  | AuthStateLoggedIn;

export type AuthAction =
  | {
      type: 'login';
      payload: {
        username: string;
        userId: number;
        token: string;
        karma: number;
      };
    }
  | { type: 'logout' };

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'login':
      //set cookie
      setCookie(null, 'jwt', action.payload.token, {
        maxAge: 60 * 60,
        path: '/',
      });

      return {
        isLoggedIn: true,
        token: action.payload.token,
        userId: action.payload.userId,
        username: action.payload.username,
        karma: action.payload.karma,
      };
    case 'logout':
      //set cookie
      setCookie(null, 'jwt', 'logout', {
        maxAge: 0,
        path: '/',
      });

      return {
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
