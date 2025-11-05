import { IAuthUser } from "./../../interfaces/common";
import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DoctorScheduleService } from "./doctorSchedule.service";
import peak from "../../../shared/peak";
import { scheduleFilterableFields } from "./doctorSchedule.constant";

const createDoctorSchedule = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await DoctorScheduleService.createDoctorSchedule(
      user,
      req.body
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Doctor Schedule create successfully",
      data: result,
    });
  }
);

const getMySchedules = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = peak(req.query, ["startDate", "endDate", "isBooked"]);
    const options = peak(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const user = req.user;
    const result = await DoctorScheduleService.getMySchedules(
      filters,
      options,
      user as IAuthUser
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My Schedules retrieve successfully",
      data: result,
    });
  }
);

const getAllSchedulesFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const filters = peak(req.query, scheduleFilterableFields);
    const options = peak(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await DoctorScheduleService.getAllSchedulesFromDB(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Doctor Schedule retrieve successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

const deleteMySchedule = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const { id } = req.params;
    const user = req.user;
    const result = await DoctorScheduleService.deleteMySchedule(
      user as IAuthUser,
      id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My Schedules deleted successfully",
      data: result,
    });
  }
);

export const DoctorScheduleController = {
  createDoctorSchedule,
  getMySchedules,
  getAllSchedulesFromDB,
  deleteMySchedule,
};
