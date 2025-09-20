import express from "express";
import { AdminController } from "./admin.controller";
import validatedRequest from "../../middlewares/validateRequest";
import { AdminValidationSchemas } from "./admin.validations";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AdminController.getAllAdmin
);
router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AdminController.getAdminById
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validatedRequest(AdminValidationSchemas.update),
  AdminController.updateAdmin
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AdminController.deleteAdmin
);
router.delete(
  "/soft/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AdminController.softDeleteAdmin
);

export const AdminRoutes = router;
