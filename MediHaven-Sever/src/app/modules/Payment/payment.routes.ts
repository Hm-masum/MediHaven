import express from "express";
import { PaymentController } from "./payment.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.get("/", auth(UserRole.ADMIN,UserRole.SUPER_ADMIN), PaymentController.getAllPayments);
router.get(
  "/my-payments",
  auth(UserRole.DOCTOR,UserRole.PATIENT),
  PaymentController.getMyPayments,
);
router.get("/ipn", PaymentController.validatePayment);
router.post("/init-payment/:appointmentId", PaymentController.initPayment);

export const PaymentRoutes = router;
