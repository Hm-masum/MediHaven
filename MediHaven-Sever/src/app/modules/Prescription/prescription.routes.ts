import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { PrescriptionController } from "./prescription.controller";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.DOCTOR),
  PrescriptionController.createPrescription
);

router.get("/", PrescriptionController.getAllPrescription);

router.get(
  "/my-prescription",
  auth(UserRole.PATIENT),
  PrescriptionController.getPatientPrescription
);

router.get(
  "/doctor-prescription",
  auth(UserRole.DOCTOR),
  PrescriptionController.getDoctorPrescription
);

export const PrescriptionRoutes = router;
