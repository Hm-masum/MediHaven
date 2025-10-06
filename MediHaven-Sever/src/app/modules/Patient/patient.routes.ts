import express from "express";
import { PatientController } from "./patient.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/", PatientController.getAllPatients);
router.get("/:id", PatientController.getPatientById);

router.patch("/:id", PatientController.updatePatientIntoDB);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  PatientController.deletePatient
);

router.delete(
  "/soft/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  PatientController.softDeletePatient
);

export const PatientRoutes = router;
