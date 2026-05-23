"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const getAllAdmin = async () => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["admin"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAdminById = async (id: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/${id}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["admin"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateAdminById = async (id: string, userData: any) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    revalidateTag("admin", "max");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteAdmin = async (id: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    revalidateTag("admin", "max");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const softDeleteAdmin = async (id: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/admin/soft/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      },
    );
    revalidateTag("admin", "max");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
