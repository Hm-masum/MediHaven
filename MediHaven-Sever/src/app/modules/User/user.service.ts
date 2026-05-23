import {
  Admin,
  Doctor,
  Patient,
  Prisma,
  UserRole,
  UserStatus,
} from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { fileUploader } from "../../../helper/fileUploader";
import { IFile } from "../../interfaces/file";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helper/paginationHelper";
import { userSearchAbleFields } from "./user.constant";

const createAdmin = async (req: any): Promise<Admin> => {
  const file: IFile = req.file;
  if (file) {
    const uploadCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });

    return createdAdminData;
  });

  return result;
};

const createDoctor = async (req: any): Promise<Doctor> => {
  const file: IFile = req.file;
  if (file) {
    const uploadCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.doctor.profilePhoto = uploadCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdDoctorData = await transactionClient.doctor.create({
      data: req.body.doctor,
    });

    return createdDoctorData;
  });

  return result;
};

const createPatient = async (req: any): Promise<Patient> => {
  const file: IFile = req.file;
  if (file) {
    const uploadCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.patient.profilePhoto = uploadCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.patient.email,
    password: hashedPassword,
    role: UserRole.PATIENT,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdPatientData = await transactionClient.patient.create({
      data: req.body.patient,
    });

    const getpatientData = await transactionClient.patient.findUniqueOrThrow({
      where: {
        email: req.body.patient.email,
      },
      include: {
        user: true,
      },
    });

    return getpatientData;
  });

  return result;
};

const getAllFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
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
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip: skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      admin: true,
      patient: true,
      doctor: true,
    },
    // include: {
    //   admin: true,
    //   patient: true,
    //   doctor: true,
    // },
  });

  const total = await prisma.user.count({ where: whereConditions });

  return {
    data: result,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const changeProfileStatus = async (id: string, status: UserRole) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updateUserStatus = await prisma.user.update({
    where: { id },
    data: status,
  });

  return updateUserStatus;
};

const getMyProfile = async (email: string) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
    },
  });

  let profileInfo;

  if (userInfo.role === UserRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.PATIENT) {
    profileInfo = await prisma.patient.findUnique({
      where: {
        email: userInfo.email,
      },
      include: {
        medicalReport: true,
        patientHealthData: true,
      },
    });
  } else if (userInfo.role === UserRole.DOCTOR) {
    profileInfo = await prisma.doctor.findUnique({
      where: {
        email: userInfo.email,
      },
      include: {
        doctorSpecialties: {
          include: {
            specialties: true,
          },
        },
      },
    });
  }

  return { ...userInfo, ...profileInfo };
};

const updateMyProfile = async (email: string, req: any) => {
  const file = req.file as IFile;
  if (file) {
    const uploadCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.profilePhoto = uploadCloudinary?.secure_url;
  }

  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
    },
  });

  let profileInfo;

  if (userInfo.role === UserRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === UserRole.PATIENT) {
    const { patientHealthData, ...remainingData } = req.body;
    profileInfo = await prisma.$transaction(async (tx) => {
      const patient = await tx.patient.update({
        where: {
          email: userInfo.email,
        },
        data: {
          ...remainingData,
        },
      });

      if (patientHealthData) {
        await tx.patientHealthData.upsert({
          where: { patientId: patient.id },
          update: patientHealthData,
          create: { ...patientHealthData, patientId: patient.id },
        });
      }

      return patient;
    });
  } else if (userInfo.role === UserRole.DOCTOR) {
    const { doctorSpecialties, ...remainingData } = req.body;
    profileInfo = await prisma.$transaction(async (tx) => {
      const doctor = await tx.doctor.update({
        where: {
          email: userInfo.email,
        },
        data: {
          ...remainingData,
        },
      });
      if (doctorSpecialties?.length) {
        await tx.doctorSpecialties.deleteMany({
          where: {
            doctorId: doctor.id,
          },
        });

        await tx.doctorSpecialties.createMany({
          data: doctorSpecialties.map((specialtyId: string) => ({
            doctorId: doctor.id,
            specialtiesId: specialtyId,
          })),
        });
      }

      return doctor;
    });
  }

  return { ...userInfo, ...profileInfo };
};

export const UserService = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
  changeProfileStatus,
  getMyProfile,
  updateMyProfile,
};
