export const jwtSettings = {
  secret: process.env.JWT_SECRET,
  ignoreExpiration: process.env.JWT_IGNORE_EXP,
};
