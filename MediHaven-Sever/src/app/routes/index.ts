import express from "express";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { UserRoutes } from "../modules/User/user.route";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { PatientRoutes } from "../modules/Patient/patient.router";
import { DoctorRoutes } from "../modules/Doctor/doctor.route";
import { SpecialtiesRoutes } from "../modules/Specialties/specialties.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/specialties",
    route: SpecialtiesRoutes,
  },
  {
    path: "/doctor",
    route: DoctorRoutes,
  },
  {
    path: "/patient",
    route: PatientRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
