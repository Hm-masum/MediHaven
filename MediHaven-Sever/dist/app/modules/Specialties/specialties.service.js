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
exports.SpecialtiesService = void 0;
const fileUploader_1 = require("../../../helper/fileUploader");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createSpecialties = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        const uploadCloudinary = yield fileUploader_1.fileUploader.uploadToCloudinary(file);
        req.body.icon = uploadCloudinary === null || uploadCloudinary === void 0 ? void 0 : uploadCloudinary.secure_url;
    }
    const result = yield prisma_1.default.specialties.create({
        data: req.body,
    });
    return result;
});
const getAllSpecialties = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.specialties.findMany({});
    return result;
});
const deleteSpecialties = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.specialties.findUniqueOrThrow({
        where: { id },
    });
    const result = yield prisma_1.default.specialties.delete({
        where: { id },
    });
    return result;
});
exports.SpecialtiesService = {
    createSpecialties,
    getAllSpecialties,
    deleteSpecialties,
};
