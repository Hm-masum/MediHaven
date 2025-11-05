import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ScheduleService } from "./schedule.service";
import peak from "../../../shared/peak";
import { IAuthUser } from "../../interfaces/common";

const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.createSchedule(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule create successfully",
    data: result,
  });
});

const getAllSchedules = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = peak(req.query, ["startDate", "endDate"]);
    const options = peak(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const user = req.user;
    const result = await ScheduleService.getAllSchedules(
      filters,
      options,
      user as IAuthUser
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Schedules retrieve successfully",
      data: result,
    });
  }
);

const getScheduleById = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await ScheduleService.getScheduleById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule fetched successfully",
    data: result,
  });
});

const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await ScheduleService.deleteSchedule(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "delete Schedule successfully",
    data: result,
  });
});

export const ScheduleController = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  deleteSchedule,
};
