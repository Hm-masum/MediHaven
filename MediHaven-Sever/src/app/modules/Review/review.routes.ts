import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.get("/", ReviewController.getAllReviews);

router.post("/", auth(UserRole.PATIENT), ReviewController.createReview);

export const ReviewRoutes = router;
