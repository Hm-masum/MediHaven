import jwt, { sign, JwtPayload, Secret } from "jsonwebtoken";

export const createToken = (
  payload: { email: string; role: string },
  secret: Secret,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn,
  });

  return token;
};

export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};
