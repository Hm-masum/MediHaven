"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialtiesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const fileUploader_1 = require("../../../helper/fileUploader");
const specialties_validation_1 = require("./specialties.validation");
const specialties_controller_1 = require("./specialties.controller");
const router = express_1.default.Router();
router.get("/", specialties_controller_1.SpecialtiesController.getAllSpecialties);
router.post("/", fileUploader_1.fileUploader.upload.single("file"), (req, res, next) => {
    req.body = specialties_validation_1.SpecialtiesValidation.createSpecialties.parse(JSON.parse(req.body.data));
    return specialties_controller_1.SpecialtiesController.createSpecialties(req, res, next);
});
router.delete("/:id", specialties_controller_1.SpecialtiesController.deleteSpecialties);
exports.SpecialtiesRoutes = router;
