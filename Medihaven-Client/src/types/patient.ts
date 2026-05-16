import { IAppointment } from "./appointment";
import { IMedicalReport } from "./medicalReport";
import { IPatientHealthData } from "./patientHealthData";
import { IPrescription } from "./prescription";
import { IReview } from "./review";
import { IUser } from "./user";

export type IPatient = {
  id: string;
  email: string;
  name: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
  patientHealthData?: IPatientHealthData;
  medicalReport: IMedicalReport[];
  appointment: IAppointment[];
  prescription: IPrescription[];
  review: IReview[];
};

export type IPatientProfile = {
  id: string;
  email: string;
  name: string;
  profilePhoto?: string;
  contactNumber?: string;
  role: string;
  needPasswordChange: boolean;
  status: string;
  address?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
  patientHealthData?: IPatientHealthData;
  medicalReport: IMedicalReport[];
  appointment: IAppointment[];
  prescription: IPrescription[];
  review: IReview[];
};
