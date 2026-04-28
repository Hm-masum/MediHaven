"use server";

import { getValidToken } from "@/lib/verifyToken";

export const createReview = async (prescriptionData: any) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(prescriptionData),
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllReviews = async () => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/review`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      },
    );
    const result =await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

