const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  const serverApiPath = process.env.SERVER_API_PATH
    ? process.env.SERVER_API_PATH
    : 'http://nine_rush_api:4000/api';
  const clientApiPath = process.env.CLIENT_API_PATH
    ? process.env.CLIENT_API_PATH
    : null;

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

  const env = {
    SERVER_API_PATH: (() => {
      if (isDev) return 'http://localhost:4000/api';
      if (isProd) {
        return serverApiPath;
      }
      if (isStaging) return 'http://localhost:4000/api';
      return 'API_PATH:not (isDev,isProd && !isStaging,isProd && isStaging)';
    })(),
    CLIENT_API_PATH: (() => {
      if (isDev) return 'http://localhost:4000/api';
      if (isProd) {
        return clientApiPath;
      }
      if (isStaging) return 'http://localhost:4000/api';
      return 'API_PATH:not (isDev,isProd && !isStaging,isProd && isStaging)';
    })(),
  };

  // next.config.js object
  return {
    env,
  };
};
