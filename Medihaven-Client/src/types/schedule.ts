import { IAppointment } from "./appointment";
import { IDoctorSchedule } from "./doctorSchedule";

export type ISchedule = {
  id: string;

  startDateTime: Date;
  endDateTime: Date;

  createdAt: Date;
  updatedAt: Date;

  doctorSchedules: IDoctorSchedule[];

  appointment?: IAppointment | null;
};