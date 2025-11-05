import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { AppointmentServices } from "./appointment.service";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { IAuthUser } from "../../interfaces/common";

const createAppointment = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await AppointmentServices.createAppointment(user, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Appointment create successfully",
      data: result,
    });
  }
);

export const AppointmentController = {
  createAppointment,
};
