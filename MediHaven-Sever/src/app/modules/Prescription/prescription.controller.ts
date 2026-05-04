import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PrescriptionServices } from "./prescription.service";
import { IAuthUser } from "../../interfaces/common";
import peak from "../../../shared/peak";
import { prescriptionFilterableFields } from "./prescription.constant";

const createPrescription = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await PrescriptionServices.createPrescription(
      req.body,
      user as IAuthUser
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Prescription create successfully",
      data: result,
    });
  }
);

const getPatientPrescription = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const options = peak(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await PrescriptionServices.getPatientPrescription(
      user as IAuthUser,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Prescription retrieve successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getDoctorPrescription = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const options = peak(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await PrescriptionServices.getDoctorPrescription(
      user as IAuthUser,
      options
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Prescription retrieve successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getAllPrescription = catchAsync(async (req: Request, res: Response) => {
  const filters = peak(req.query, prescriptionFilterableFields);
  const options = peak(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await PrescriptionServices.getAllPrescription(
    filters,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Prescriptions retrieve successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSinglePrescription = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PrescriptionServices.getSinglePrescription(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Prescription retrieve successfully",
    data: result,
  });
});

export const PrescriptionController = {
  createPrescription,
  getPatientPrescription,
  getDoctorPrescription,
  getAllPrescription,
  getSinglePrescription,
};
