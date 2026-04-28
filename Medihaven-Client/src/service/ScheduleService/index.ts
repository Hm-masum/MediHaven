"use server";

import { getValidToken } from "@/lib/verifyToken";

export const createSchedule = async (scheduleData:any) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/schedule`, {
      method:"POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scheduleData)
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllSchedule = async () => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/schedule`, {
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

export const getScheduleById = async (id:string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/schedule/${id}`, {
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

export const deleteSchedule = async (id:string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/schedule/${id}`, {
      method:"DELETE",
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
