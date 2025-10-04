import { PatientService } from "./patient.service";
import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

const getAllPatients = catchAsync(async (req: Request, res: Response) => {
  const result = await PatientService.getAllPatients();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patients retrieve successfully",
    data: result,
  });
});

export const PatientController = {
  getAllPatients,
};
