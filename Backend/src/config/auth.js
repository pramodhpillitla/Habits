export const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET || process.env.ACCESS_TOKEN_SECRET;
  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET or ACCESS_TOKEN_SECRET is required in production");
  }

  return "habit-due-local-development-secret";
};
