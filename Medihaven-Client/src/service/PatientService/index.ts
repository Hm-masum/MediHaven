"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const getAllPatient = async (searchTerm?: string) => {
  try {
    const token = await getValidToken();

    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_API}/patient`);
    if (searchTerm) {
      url.searchParams.append("searchTerm", searchTerm);
    }

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["patient"],
      },
      cache: "no-store"
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getPatientById = async (id: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/patient/${id}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["patient"],
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updatePatientById = async (id: string, userData: any) => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/patient/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      },
    );
    revalidateTag("patient","everything");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deletePatient = async (id: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/patient/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      },
    );
    revalidateTag("patient","everything");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const softDeletePatient = async (id: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/patient/soft/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      },
    );
    revalidateTag("patient","everything");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
