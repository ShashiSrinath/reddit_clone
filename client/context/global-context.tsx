import React, { createContext } from 'react';

interface Props {
  auth: { token?: string; username?: string; userId?: number };
  apiPath: string;
}
export const AuthContext = createContext<{
  token?: string;
  username?: string;
  userId?: number;
}>({});
export const ApiContext = createContext<{ apiPath: string }>({
  apiPath: 'http://localhost:4000',
});

const GlobalContext: React.FC<Props> = (props) => {
  return (
    <ApiContext.Provider value={{ apiPath: props.apiPath }}>
      <AuthContext.Provider value={props.auth}>
        {props.children}
      </AuthContext.Provider>
    </ApiContext.Provider>
  );
};

export default GlobalContext;
