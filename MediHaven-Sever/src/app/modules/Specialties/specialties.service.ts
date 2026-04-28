import { Specialties } from "@prisma/client";
import { fileUploader } from "../../../helper/fileUploader";
import { IFile } from "../../interfaces/file";
import prisma from "../../../shared/prisma";
import { Request } from "express";

const createSpecialties = async (req: Request) => {
  const file: IFile = req.file as IFile;
  if (file) {
    const uploadCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.icon = uploadCloudinary?.secure_url;
  }

  const result = await prisma.specialties.create({
    data: req.body,
  });
  return result;
};

const getAllSpecialties = async () => {
  const result = await prisma.specialties.findMany({
    include:{
      doctorSpecialties:true
    }
  });
  return result;
};

const getSingleSpecialties = async (id: string) => {
  const result = await prisma.specialties.findUnique({
    where: { id },
  });
  return result;
};

const updateSpecialties = async (id: string, req: Request) => {
  const file: IFile = req.file as IFile;
  if (file) {
    const uploadCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.icon = uploadCloudinary?.secure_url;
  }

  const result = await prisma.specialties.update({
    where: { id },
    data: req.body,
  });
  return result;
};

const deleteSpecialties = async (id: string) => {
  await prisma.specialties.findUniqueOrThrow({
    where: { id },
  });

  const result = await prisma.specialties.delete({
    where: { id },
  });
  return result;
};

export const SpecialtiesService = {
  createSpecialties,
  getAllSpecialties,
  updateSpecialties,
  getSingleSpecialties,
  deleteSpecialties,
};
