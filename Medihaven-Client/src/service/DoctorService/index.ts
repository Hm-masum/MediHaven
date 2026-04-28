"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const getAllDoctor = async (searchTerm?: string) => {
  try {
    const token = await getValidToken();

    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_API}/doctor`);
    if(searchTerm){
      url.searchParams.append("searchTerm", searchTerm);
    }

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["doctor"],
      },
      cache: "no-store"
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getDoctorById = async (id:string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/doctor/${id}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["doctor"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateDoctorById = async (id:string,userData:any) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/doctor/${id}`, {
      method:"PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    });
    revalidateTag("doctor","everything");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteDoctor = async (id:string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/doctor/${id}`, {
      method:"DELETE",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    revalidateTag("doctor","everything");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const softDeleteDoctor = async (id:string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/doctor/soft/${id}`, {
      method:"DELETE",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    revalidateTag("doctor","everything");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};