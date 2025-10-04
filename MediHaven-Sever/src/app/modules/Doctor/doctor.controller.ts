import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { DoctorService } from "./doctor.service";
import sendResponse from "../../../shared/sendResponse";
import peak from "../../../shared/peak";
import { doctorFilterableFields } from "./doctor.constant";

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const filters = peak(req.query, doctorFilterableFields);
  const options = peak(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await DoctorService.getAllDoctors(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctors retrieve successfully",
    data: result,
  });
});

const getDoctorById = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorService.getDoctorById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor retrieve successfully",
    data: result,
  });
});

const updateDoctorIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await DoctorService.updateDoctorIntoDB(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update doctor successfully",
    data: result,
  });
});

const deleteDoctor = catchAsync(async (req, res) => {
  const result = await DoctorService.deleteDoctor(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor deleted successfully",
    data: result,
  });
});

const softDeleteDoctor = catchAsync(async (req, res) => {
  const result = await DoctorService.softDeleteDoctor(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor deleted successfully",
    data: result,
  });
});

export const DoctorController = {
  getAllDoctors,
  updateDoctorIntoDB,
  deleteDoctor,
  softDeleteDoctor,
  getDoctorById,
};
