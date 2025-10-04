import express, { NextFunction, Request, Response } from "express";
import { fileUploader } from "../../../helper/fileUploader";
import { SpecialtiesValidation } from "./specialties.validation";
import { SpecialtiesController } from "./specialties.controller";

const router = express.Router();

router.get("/", SpecialtiesController.getAllSpecialties);

router.post(
  "/",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialtiesValidation.createSpecialties.parse(
      JSON.parse(req.body.data)
    );
    return SpecialtiesController.createSpecialties(req, res, next);
  }
);

router.delete("/:id", SpecialtiesController.deleteSpecialties);

export const SpecialtiesRoutes = router;
