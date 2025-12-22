"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrescriptionController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const prescription_service_1 = require("./prescription.service");
const peak_1 = __importDefault(require("../../../shared/peak"));
const prescription_constant_1 = require("./prescription.constant");
const createPrescription = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield prescription_service_1.PrescriptionServices.createPrescription(req.body, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Prescription create successfully",
        data: result,
    });
}));
const getPatientPrescription = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const options = (0, peak_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield prescription_service_1.PrescriptionServices.getPatientPrescription(user, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Prescription retrieve successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getDoctorPrescription = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const options = (0, peak_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield prescription_service_1.PrescriptionServices.getDoctorPrescription(user, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Prescription retrieve successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getAllPrescription = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, peak_1.default)(req.query, prescription_constant_1.prescriptionFilterableFields);
    const options = (0, peak_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield prescription_service_1.PrescriptionServices.getAllPrescription(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Prescriptions retrieve successfully",
        meta: result.meta,
        data: result.data,
    });
}));
exports.PrescriptionController = {
    createPrescription,
    getPatientPrescription,
    getDoctorPrescription,
    getAllPrescription,
};
