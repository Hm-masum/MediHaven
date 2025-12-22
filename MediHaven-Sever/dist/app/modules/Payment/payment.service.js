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
exports.PaymentService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ssl_service_1 = require("../SSL/ssl.service");
const client_1 = require("@prisma/client");
const initPayment = (appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const paymentData = yield prisma_1.default.payment.findFirstOrThrow({
        where: {
            appointmentId,
        },
        include: {
            appointment: {
                include: { patient: true },
            },
        },
    });
    const initPaymentData = {
        amount: paymentData === null || paymentData === void 0 ? void 0 : paymentData.amount,
        transactionId: paymentData === null || paymentData === void 0 ? void 0 : paymentData.transactionId,
        name: (_b = (_a = paymentData === null || paymentData === void 0 ? void 0 : paymentData.appointment) === null || _a === void 0 ? void 0 : _a.patient) === null || _b === void 0 ? void 0 : _b.name,
        email: (_d = (_c = paymentData === null || paymentData === void 0 ? void 0 : paymentData.appointment) === null || _c === void 0 ? void 0 : _c.patient) === null || _d === void 0 ? void 0 : _d.email,
        address: (_f = (_e = paymentData === null || paymentData === void 0 ? void 0 : paymentData.appointment) === null || _e === void 0 ? void 0 : _e.patient) === null || _f === void 0 ? void 0 : _f.address,
        contactNumber: (_h = (_g = paymentData === null || paymentData === void 0 ? void 0 : paymentData.appointment) === null || _g === void 0 ? void 0 : _g.patient) === null || _h === void 0 ? void 0 : _h.contactNumber,
    };
    const result = yield ssl_service_1.SSLService.initPayment(initPaymentData);
    return {
        paymentUrl: result.GatewayPageURL,
    };
});
const validatePayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!payload || !payload.status || !(payload.status == "VALID")) {
    //   return {
    //     message: "Invalid Payment!",
    //   };
    // }
    // const response = await SSLService.validatePayment(payload);
    // if (response?.status !== "VALID") {
    //   return {
    //     message: "Payment validation failed!",
    //   };
    // }
    const response = payload;
    yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedPaymentData = yield tx.payment.update({
            where: {
                transactionId: response === null || response === void 0 ? void 0 : response.tran_id,
            },
            data: {
                status: client_1.PaymentStatus.PAID,
                paymentGatewayData: response,
            },
        });
        yield tx.appointment.update({
            where: {
                id: updatedPaymentData.appointmentId,
            },
            data: {
                paymentStatus: client_1.PaymentStatus.PAID,
            },
        });
    }));
    return {
        message: "Payment validated successfully!",
    };
});
exports.PaymentService = {
    initPayment,
    validatePayment,
};
