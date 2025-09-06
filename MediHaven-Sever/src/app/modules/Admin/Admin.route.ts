import express from "express";
import { AdminController } from "./admin.controller";
import validatedRequest from "../../middlewares/validateRequest";
import { AdminValidationSchemas } from "./admin.validations";

const router = express.Router();

router.get("/", AdminController.getAllAdmin);
router.get("/:id", AdminController.getAdminById);

router.patch(
  "/:id",
  validatedRequest(AdminValidationSchemas.update),
  AdminController.updateAdmin
);

router.delete("/:id", AdminController.deleteAdmin);
router.delete("/soft/:id", AdminController.softDeleteAdmin);

export const AdminRoutes = router;
