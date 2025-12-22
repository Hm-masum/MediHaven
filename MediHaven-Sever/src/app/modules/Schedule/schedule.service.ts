import { addHours, addMinutes, format } from "date-fns";
import prisma from "../../../shared/prisma";
import { IFilterRequest, ISchedule } from "./schedule.interface";
import { Prisma, Schedule } from "@prisma/client";
import { paginationHelper } from "../../../helper/paginationHelper";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IAuthUser } from "../../interfaces/common";

// utc time
// const convertDateTime = async(date:Date)=>{
//   const offset = date.getTimezoneOffset() * 60 * 1000;
//   return new Date(date.getDate() + offset)
// }

const createSchedule = async (payload: ISchedule) => {
  const { startDate, endDate, startTime, endTime } = payload;

  const intervalTime = 30;
  const schedules = [];

  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0])
        ),
        Number(startTime.split(":")[1])
      )
    );

    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0])
        ),
        Number(endTime.split(":")[1])
      )
    );

    while (startDateTime < endDateTime) {
      const scheduleData = {
        startDateTime: startDateTime,
        endDateTime: addMinutes(startDateTime, intervalTime),
      };

      const existingSchedule = await prisma.schedule.findFirst({
        where: {
          startDateTime: scheduleData.startDateTime,
          endDateTime: scheduleData.endDateTime,
        },
      });

      if (!existingSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });
        schedules.push(result);
      }
      startDateTime.setMinutes(startDateTime.getMinutes() + intervalTime);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
};

const getAllSchedules = async (
  filters: IFilterRequest,
  options: IPaginationOptions,
  user: IAuthUser
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const { startDate, endDate, ...filterData } = filters;

  const andConditions: Prisma.ScheduleWhereInput[] = [];

  if (startDate && endDate) {
    andConditions.push({
      AND: [
        { startDateTime: { gte: new Date(startDate) } },
        { endDateTime: { lte: new Date(endDate) } },
      ],
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

  const whereConditions: Prisma.ScheduleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const doctorSchedules = await prisma.doctorSchedule.findMany({
    where: {
      doctor: { email: user?.email },
    },
  });

  const doctorScheduleIds = doctorSchedules.map(
    (schedule) => schedule.scheduleId
  );

  const result = await prisma.schedule.findMany({
    where: { ...whereConditions, id: { notIn: doctorScheduleIds } },
    skip: skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.schedule.count({
    where: { ...whereConditions, id: { notIn: doctorScheduleIds } },
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getScheduleById = async (id: string): Promise<Schedule | null> => {
  const result = await prisma.schedule.findUnique({
    where: { id },
  });
  return result;
};

const deleteSchedule = async (id: string): Promise<Schedule> => {
  const result = await prisma.schedule.delete({
    where: { id },
  });
  return result;
};

export const ScheduleService = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  deleteSchedule,
};
