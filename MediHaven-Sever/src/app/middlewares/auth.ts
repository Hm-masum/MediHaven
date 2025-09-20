import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import { verifyToken } from "../../helper/jwtHelper";
import ApiError from "../errors/ApiError";
import { NextFunction, Request, Response } from "express";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      let verifiedUser;

      verifiedUser = verifyToken(token, config.jwt.jwt_secret as Secret);

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "forbidden access!");
      }

      req.user = verifiedUser;

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
