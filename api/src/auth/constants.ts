export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'supersecretjwt',
  signInOptions: {
    expiresIn: process.env.JWT_EXPIRES_IN || '60m',
  },
};
