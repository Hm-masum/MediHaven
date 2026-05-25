import { randomUUID } from "crypto";


export const videoCallingId = () => {
  return randomUUID();
};

export const transactionId = () => {
  const today = new Date();

  return (
    "Medi-Haven-" +
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    "-" +
    today.getHours() +
    "-" +
    today.getMinutes() +
    "-" +
    today.getSeconds() 
  );
};


export const appointmentFilterableFields: string[] = [
  "status",
  "paymentStatus",
  "patientEmail",
  "doctorEmail",
];
