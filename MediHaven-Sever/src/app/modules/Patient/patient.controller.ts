import { PatientService } from "./patient.service";
import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { patientFilterableFields } from "./patient.constant";
import peak from "../../../shared/peak";

const getAllPatients = catchAsync(async (req: Request, res: Response) => {
  const filters = peak(req.query, patientFilterableFields);
  const options = peak(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await PatientService.getAllPatients(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patients retrieve successfully",
    data: result,
  });
});

const getPatientById = catchAsync(async (req: Request, res: Response) => {
  const result = await PatientService.getPatientById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient retrieve successfully",
    data: result,
  });
});

const updatePatientIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await PatientService.updatePatientIntoDB(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update Patient successfully",
    data: result,
  });
});

const deletePatient = catchAsync(async (req: Request, res: Response) => {
  const result = await PatientService.deletePatient(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient deleted successfully",
    data: result,
  });
});

const softDeletePatient = catchAsync(async (req: Request, res: Response) => {
  const result = await PatientService.softDeletePatient(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient deleted successfully",
    data: result,
  });
});

export const PatientController = {
  getAllPatients,
  getPatientById,
  updatePatientIntoDB,
  deletePatient,
  softDeletePatient,
};
