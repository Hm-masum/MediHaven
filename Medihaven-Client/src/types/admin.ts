import { IUser } from "./user";

export type IAdmin = {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
  contactNumber: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
};

export type IAdminProfile = {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
  contactNumber: string;
  isDeleted: boolean;
   role: string;
  needPasswordChange: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;

};