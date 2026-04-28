import { IAppointment } from "./appointment";
import { IDoctor } from "./doctor";
import { IPatient } from "./patient";

export type IPrescription = {
  id: string;
  appointmentId: string;
  appointment: IAppointment;
  doctorId: string;
  doctor: IDoctor;
  patientId: string;
  patient: IPatient;
  instructions: string;
  followUpDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};