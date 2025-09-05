import { Admin, Prisma, UserStatus } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.constant";
import { paginationHelper } from "../../../helper/paginationHelper";
import prisma from "../../../shared/prisma";

const getAllAdmin = async (params: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.AdminWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };
  console.dir(whereConditions, { depth: null });

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip: skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.admin.count({ where: whereConditions });

  return {
    data: result,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getAdminById = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: { id },
  });
  return result;
};

const updateAdmin = async (id: string, payload: Partial<Admin>) => {
  await prisma.admin.findUniqueOrThrow({
    where: { id },
  });

  const result = await prisma.admin.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteAdmin = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: { id },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.delete({
      where: { id },
    });

    const userDeletedData = await transactionClient.user.delete({
      where: { email: adminDeletedData.email },
    });
    return adminDeletedData;
  });
  return result;
};

const softDeleteAdmin = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: { id },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.update({
      where: { id },
      data: { isDeleted: true },
    });

    const userDeletedData = await transactionClient.user.update({
      where: { email: adminDeletedData.email },
      data: { status: UserStatus.DELETED },
    });
    return adminDeletedData;
  });
  return result;
};

export const AdminService = {
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
