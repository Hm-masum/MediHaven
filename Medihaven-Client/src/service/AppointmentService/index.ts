"use server";

import { getValidToken } from "@/lib/verifyToken";

export const createAppointment = async (appointmentData: any) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/appointment`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(appointmentData),
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllAppointment = async (status?: string) => {
  try {
    const token = await getValidToken();

    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_API}/appointment`);
    if(status){
      url.searchParams.append("status", status);
    }

    const res = await fetch(
      url.toString(),
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getMyAppointment = async () => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/appointment/my-appointment`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const changeAppointmentStatus = async (id: string,status:string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/appointment/status/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body:JSON.stringify(status)
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
