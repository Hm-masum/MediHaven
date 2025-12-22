"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const doctor_controller_1 = require("./doctor.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get("/", doctor_controller_1.DoctorController.getAllDoctors);
router.get("/:id", doctor_controller_1.DoctorController.getDoctorById);
router.patch("/:id", doctor_controller_1.DoctorController.updateDoctorIntoDB);
router.delete("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), doctor_controller_1.DoctorController.deleteDoctor);
router.delete("/soft/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUPER_ADMIN), doctor_controller_1.DoctorController.softDeleteDoctor);
exports.DoctorRoutes = router;
