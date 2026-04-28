import { IPatient } from "./patient";
import { IBloodGroup, IGender, IMaritalStatus } from "./utils";

export type IPatientHealthData = {
  id: string;
  patientId: string;
  patient: IPatient;
  gender: IGender;
  dateOfBirth: string;
  bloodGroup: IBloodGroup;
  hasAllergies?: boolean;
  hasDiabetes?: boolean;
  height: string;
  weight: string;
  smokingStatus?: boolean;
  dietaryPreferences?: string;
  pregnancyStatus?: boolean;
  mentalHealthHistory?: string;
  immunizationStatus?: string;
  hasPastSurgeries?: boolean;
  recentAnxiety?: boolean;
  recentDepression?: boolean;
  maritalStatus?: IMaritalStatus;
  createdAt: Date;
  updatedAt: Date;
};