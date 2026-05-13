"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const createPrescription = async (prescriptionData: any) => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/prescription`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: JSON.stringify(prescriptionData),
      },
    );
    revalidateTag("prescriptions", "everything");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllPrescription = async ({ doctorEmail }: { doctorEmail?: string }) => {
  try {
    const token = await getValidToken();

    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_API}/prescription`);
    if (doctorEmail) {  
      url.searchParams.append("doctorEmail", doctorEmail);
    }
    const res = await fetch(
      url.toString(),
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["prescriptions"],
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getMyPrescription = async () => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/prescription/my-prescription`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["prescriptions"],
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getDoctorPrescription = async (searchTerm?: string) => {
  try {
    const token = await getValidToken();

    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_API}/prescription/doctor-prescription`);
    if (searchTerm) {
      url.searchParams.append("searchTerm", searchTerm);
    }
    const res = await fetch(
      url.toString(),
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["prescriptions"],
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getSinglePrescription = async (prescriptionId: string) => {
  try {
    const token = await getValidToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/prescription/${prescriptionId}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["prescriptions"],
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
