import { IPatient } from "./patient";

export type IMedicalReport = {
  id: string;
  patientId: string;
  patient: IPatient;
  reportName: string;
  reportLink: string;
  createdAt: Date;
  updatedAt: Date;
};