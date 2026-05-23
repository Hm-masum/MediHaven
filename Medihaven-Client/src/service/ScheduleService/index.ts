"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

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
    revalidateTag("schedules","max");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllSchedule = async (page: number, limit: number) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/schedule?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["schedules"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleScheduleById = async (id:string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/schedule/${id}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["schedules"],
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
    revalidateTag("schedules","max");
    const result =await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
