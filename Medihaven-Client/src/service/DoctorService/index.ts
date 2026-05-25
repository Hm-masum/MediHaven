"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const getAllDoctor = async (
  searchTerm?: string,
  gender?: string,
  specialties?: string,
  page?: number,
  limit?: number,
) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_API}/doctor`);
    if (searchTerm) {
      url.searchParams.append("searchTerm", searchTerm);
    }
    if (gender) {
      url.searchParams.append("gender", gender);
    }
    if (specialties) {
      url.searchParams.append("specialties", specialties);
    }
    if (page) {
      url.searchParams.append("page", page.toString());
    }
    if (limit) {
      url.searchParams.append("limit", limit.toString());
    }

    const res = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["doctor"],
      },
      cache: "no-store",
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getDoctorById = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/doctor/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["doctor"],
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateDoctorById = async (id: string, userData: any) => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/doctor/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      },
    );
    revalidateTag("doctor", "max");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteDoctor = async (id: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/doctor/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      },
    );
    revalidateTag("doctor", "max");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const softDeleteDoctor = async (id: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/doctor/soft/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      },
    );
    revalidateTag("doctor", "max");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
