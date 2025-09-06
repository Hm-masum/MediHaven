import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { createToken, verifyToken } from "../../../helper/jwtHelper";
import { UserStatus } from "@prisma/client";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email, status: UserStatus.ACTIVE },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }

  const accessToken = createToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "sdfghjklkjhgfdsdfghjkl",
    "5m"
  );

  const refreshToken = createToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "sdfghjklkjhgfdsdfghmlk",
    "30d"
  );

  console.log(accessToken);

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = verifyToken(token, "sdfghjklkjhgfdsdfghmlk");
  } catch (err) {
    throw new Error("You are not authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = createToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "sdfghjklkjhgfdsdfghjkl",
    "5m"
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export const authServices = {
  loginUser,
  refreshToken,
};
