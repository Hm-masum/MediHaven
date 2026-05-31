"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const initPayment = async (appointmentId: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment/init-payment/${appointmentId}`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
    });
    revalidateTag("payments","max");
    const result =await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const validatePayment = async (query: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/payment/ipn?${query}`,
      {
        method: "POST",
        cache: "no-store",
      }
    );
    revalidateTag("payments", "max");
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllPayments = async () => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["payments"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getMyPayments = async () => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payment/my-payments`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["payments"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

