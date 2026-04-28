"use server";

import { getValidToken } from "@/lib/verifyToken";

export const initPayment = async (appointmentId: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment/${appointmentId}`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
    });
    const result =await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

