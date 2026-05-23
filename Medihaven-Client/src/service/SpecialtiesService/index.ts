"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const getAllSpecialties = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/specialties`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["specialties"],
      },
    });

    const result =await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleSpecialties = async (id:string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/specialties/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["specialties"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const createSpecialties = async (specialtiesData:FormData) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/specialties`, {
      method:"POST",
      headers: {
          Authorization: token,
      },
      body: specialtiesData,
    });
    revalidateTag("specialties","max");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateSpecialties = async (id:string,specialtiesData:FormData) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/specialties/${id}`, {
      method:"PATCH",
      headers: {
          Authorization: token,
      },
      body: specialtiesData,
    });
    revalidateTag("specialties","max");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteSpecialties = async (id:string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/specialties/${id}`, {
      method:"DELETE",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    revalidateTag("specialties","max");
    const result =await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};