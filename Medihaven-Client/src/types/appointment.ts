import { IDoctor } from "./doctor";
import { IDoctorSchedule } from "./doctorSchedule";
import { IPatient } from "./patient";
import { IPayment } from "./payment";
import { IPrescription } from "./prescription";
import { IReview } from "./review";
import { ISchedule } from "./schedule";
import { IAppointmentStatus, IPaymentStatus } from "./utils";


export type IAppointment = {
  id: string;
  patientId: string;
  patient: IPatient;
  doctorId: string;
  doctor: IDoctor;
  scheduleId: string;
  schedule: ISchedule;
  videoCallingId: string;
  status?: IAppointmentStatus;
  paymentStatus?: IPaymentStatus;
  createdAt: Date;
  updatedAt: Date;
  doctorSchedules?: IDoctorSchedule | null;
  payment?: IPayment | null;
  prescription?: IPrescription | null;
  review?: IReview | null;
};