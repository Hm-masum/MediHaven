import { IAppointment } from "./appointment";
import { IDoctor } from "./doctor";
import { IPatient } from "./patient";

export type IReview = {
  id: string;
  patientId: string;
  patient: IPatient;
  doctorId: string;
  doctor: IDoctor;
  appointmentId: string;
  appointment: IAppointment;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
};