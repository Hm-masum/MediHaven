"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const createDoctorSchedule = async (scheduleData: any) => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/doctor-schedule`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(scheduleData),
      },
    );
    revalidateTag("doctor-schedules","max");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllDoctorSchedule = async () => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/doctor-schedule`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["doctor-schedules"],
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getMySchedule = async () => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/doctor-schedule/my-schedules`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["doctor-schedules"],
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteMySchedule = async (id: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/doctor-schedule/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      },
    );
    revalidateTag("doctor-schedules","max");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
