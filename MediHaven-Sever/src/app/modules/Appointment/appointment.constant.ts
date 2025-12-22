// import { v4 as uuidv4 } from "uuid";
//export const videoCallingId:string = uuidv4();
export const videoCallingId: string = "gdsahfg674364gfdsahgsd";

const today = new Date();
export const transactionId =
  "Medi-Haven-" +
  today.getFullYear() +
  "-" +
  today.getMonth() +
  "-" +
  today.getDate() +
  "-" +
  today.getHours() +
  "-" +
  today.getMinutes() +
  "-" +
  today.getSeconds();

export const appointmentFilterableFields: string[] = [
  "status",
  "paymentStatus",
  "patientEmail",
  "doctorEmail",
];
