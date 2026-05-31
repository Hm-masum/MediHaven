import { IAdmin } from "./admin";
import { IDoctor } from "./doctor";
import { IPatient } from "./patient";
import { IUserStatus } from "./utils";

export type IUser = {
  name:string
  email: string;
  role: "ADMIN" | "SUPER_ADMIN" | "DOCTOR" | "PATIENT";
  profilePhoto?:string;
  needPasswordChange?: boolean;
  status?: IUserStatus;
  admin?: IAdmin | null;
  doctor?: IDoctor | null;
  patient?: IPatient | null;
  createdAt?: Date;
  updatedAt?: Date;
};
