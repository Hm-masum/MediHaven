import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { AppointmentServices } from "./appointment.service";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { IAuthUser } from "../../interfaces/common";
import peak from "../../../shared/peak";
import { appointmentFilterableFields } from "./appointment.constant";

const createAppointment = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await AppointmentServices.createAppointment(
      user as IAuthUser,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Appointment create successfully",
      data: result,
    });
  }
);

const getAllAppointment = catchAsync(async (req: Request, res: Response) => {
  const filters = peak(req.query, appointmentFilterableFields);
  const options = peak(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await AppointmentServices.getAllAppointment(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Appointment retrieve successfully",
    data: result,
  });
});

const getMyAppointment = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const filters = peak(req.query, ["status", "paymentStatus"]);
    const options = peak(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await AppointmentServices.getMyAppointment(
      filters,
      options,
      user as IAuthUser
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Appointment retrieve successfully",
      data: result,
    });
  }
);

const changeAppointmentStatus = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const result = await AppointmentServices.changeAppointmentStatus(
      id,
      status
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Appointment status changed successfully",
      data: result,
    });
  }
);

export const AppointmentController = {
  createAppointment,
  getMyAppointment,
  getAllAppointment,
  changeAppointmentStatus,
};
