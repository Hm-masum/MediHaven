import { Patient, Prisma, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../../helper/paginationHelper";
import { patientSearchableFields } from "./patient.constant";
import { IPatientFilterRequest, IPatientUpdate } from "./patient.interface";
import { IPaginationOptions } from "../../interfaces/pagination";

const getAllPatients = async (
  filters: IPatientFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.PatientWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: patientSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  andConditions.push({ isDeleted: false });

  const whereConditions: Prisma.PatientWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.patient.findMany({
    where: whereConditions,
    skip: skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
    include: {
      medicalReport: true,
      patientHealthData: true,
    },
  });

  const total = await prisma.patient.count({ where: whereConditions });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getPatientById = async (id: string) => {
  const result = await prisma.patient.findUniqueOrThrow({
    where: { id, isDeleted: false },
    include: {
      medicalReport: true,
      patientHealthData: true,
    },
  });

  return result;
};

const updatePatientIntoDB = async (
  id: string,
  payload: Partial<IPatientUpdate>
): Promise<Patient | null> => {
  const { patientHealthData, medicalReport, ...patientData } = payload;
  const patientInfo = await prisma.patient.findUniqueOrThrow({
    where: { id, isDeleted: false },
  });

  await prisma.$transaction(async (transactionClient) => {
    // update patient data
    await transactionClient.patient.update({
      where: { id },
      data: patientData,
    });

    // create or update patientHealthData
    if (patientHealthData) {
      await transactionClient.patientHealthData.upsert({
        where: { patientId: patientInfo.id },
        update: patientHealthData,
        create: { ...patientHealthData, patientId: patientInfo.id },
      });
    }

    // create or update medicalReport
    if (medicalReport) {
      await transactionClient.medicalReport.create({
        data: { ...medicalReport, patientId: patientInfo.id },
      });
    }
  });

  const updatedPatientInfo = await prisma.patient.findUniqueOrThrow({
    where: { id: patientInfo.id },
    include: {
      patientHealthData: true,
      medicalReport: true,
    },
  });

  return updatedPatientInfo;
};

const deletePatient = async (id: string) => {
  await prisma.patient.findUniqueOrThrow({
    where: { id },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.medicalReport.deleteMany({
      where: {
        patientId: id,
      },
    });

    await transactionClient.patientHealthData.delete({
      where: {
        patientId: id,
      },
    });

    const patientDeletedData = await transactionClient.patient.delete({
      where: { id },
    });

    await transactionClient.user.delete({
      where: { email: patientDeletedData.email },
    });
    return patientDeletedData;
  });
  return result;
};

const softDeletePatient = async (id: string) => {
  await prisma.patient.findUniqueOrThrow({
    where: { id, isDeleted: false },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const patientDeletedData = await transactionClient.patient.update({
      where: { id },
      data: { isDeleted: true },
    });

    await transactionClient.user.update({
      where: { email: patientDeletedData.email },
      data: { status: UserStatus.DELETED },
    });
    return patientDeletedData;
  });
  return result;
};

export const PatientService = {
  getAllPatients,
  getPatientById,
  updatePatientIntoDB,
  deletePatient,
  softDeletePatient,
};
