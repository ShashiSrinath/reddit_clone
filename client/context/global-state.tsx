import React, { createContext, useState } from 'react';
import { AuthAction, AuthState } from './reducers/auth-reducer';

interface Props {
  auth: {
    state: AuthState;
    dispatch?: React.Dispatch<AuthAction>;
  };
  apiPath: string;
}

export const GlobalContext = createContext<{
  auth: {
    state: AuthState;
    dispatch?: React.Dispatch<AuthAction>;
  };
  apiPath: string;
}>({
  auth: {
    state: { isLoggedIn: false },
  },
  apiPath: '/',
});

const GlobalState: React.FC<Props> = (props) => {
  return (
    <GlobalContext.Provider
      value={{
        auth: props.auth,
        apiPath: props.apiPath,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
