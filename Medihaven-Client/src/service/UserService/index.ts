"use server";

import { getValidToken } from "@/lib/verifyToken";

export const registerDoctor = async (userData: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/create-doctor`,
      {
        method: "POST",
        body: userData,
      },
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const registerAdmin = async (userData: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/create-admin`,
      {
        method: "POST",
        body: userData,
      },
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const registerPatient = async (userData: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/create-patient`,
      {
        method: "POST",
        body: userData,
      },
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getMe = async () => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const result =await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllUser = async () => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getUserStatus = async (id:string,status:string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${id}/status`, {
      method:"PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(status)
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateMyProfile = async (userData: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/update-my-profile`,
      {
        method: "PATCH",
        body: userData,
      },
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};