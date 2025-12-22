"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentFilterableFields = exports.transactionId = exports.videoCallingId = void 0;
// import { v4 as uuidv4 } from "uuid";
//export const videoCallingId:string = uuidv4();
exports.videoCallingId = "gdsahfg674364gfdsahgsd";
const today = new Date();
exports.transactionId = "Medi-Haven-" +
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
exports.appointmentFilterableFields = [
    "status",
    "paymentStatus",
    "patientEmail",
    "doctorEmail",
];
