import { IAppointment } from "./appointment";
import { IDoctor } from "./doctor";
import { ISchedule } from "./schedule";

export type IDoctorSchedule = {
  doctorId: string;
  doctor: IDoctor;
  scheduleId: string;
  schedule: ISchedule;
  isBooked: boolean;
  appointmentId?: string | null;
  appointment?: IAppointment | null;
};