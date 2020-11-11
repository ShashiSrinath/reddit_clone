import axios, { AxiosInstance } from 'axios';
import { parseCookies } from 'nookies';
import { useContext } from 'react';
import { GlobalContext } from '../context/global-state';

export const ServerApiRequest = (context?: any): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.SERVER_API_PATH,
  });

  instance.interceptors.request.use(function (config) {
    const jwt = parseCookies(context).jwt;
    config.headers.Authorization = jwt ? 'Bearer ' + jwt : '';
    return config;
  });

  return instance;
};

export const useApiRequest = (): AxiosInstance => {
  const {
    auth: { state },
    apiPath,
  } = useContext(GlobalContext);

  const instance = axios.create({
    baseURL: apiPath,
  });

  instance.interceptors.request.use(function (config) {
    config.headers.Authorization = state?.isLoggedIn
      ? 'Bearer ' + state.token
      : '';
    return config;
  });

  return instance;
};
