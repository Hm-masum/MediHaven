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
exports.SSLService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const initPayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            store_id: config_1.default.ssl.store_id,
            store_passwd: config_1.default.ssl.store_password,
            total_amount: paymentData === null || paymentData === void 0 ? void 0 : paymentData.amount,
            currency: "BDT",
            tran_id: paymentData === null || paymentData === void 0 ? void 0 : paymentData.transactionId,
            success_url: config_1.default.ssl.success_url,
            fail_url: config_1.default.ssl.fail_url,
            cancel_url: config_1.default.ssl.cancel_url,
            ipn_url: "http://localhost:3030/ipn",
            shipping_method: "N/A",
            product_name: "Appointment",
            product_category: "Service",
            product_profile: "general",
            cus_name: paymentData === null || paymentData === void 0 ? void 0 : paymentData.name,
            cus_email: paymentData === null || paymentData === void 0 ? void 0 : paymentData.email,
            cus_add1: paymentData === null || paymentData === void 0 ? void 0 : paymentData.address,
            cus_add2: "N/A",
            cus_city: "N/A",
            cus_state: "N/A",
            cus_postcode: "1000",
            cus_country: "Bangladesh",
            cus_phone: paymentData === null || paymentData === void 0 ? void 0 : paymentData.contactNumber,
            cus_fax: "01711111111",
            ship_name: "Customer Name",
            ship_add1: "N",
            ship_add2: "N",
            ship_city: "N",
            ship_state: "N",
            ship_postcode: 1000,
            ship_country: "Bangladesh",
        };
        const response = yield (0, axios_1.default)({
            method: "post",
            url: config_1.default.ssl.ssl_payment_api,
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        return response.data;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to initiate payment");
    }
});
const validatePayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, axios_1.default)({
            method: "GET",
            url: `${config_1.default.ssl.ssl_validation_api}?val_id=${payload.val_id}&store_id=${config_1.default.ssl.store_id}&store_passwd=${config_1.default.ssl.store_password}&format=json`,
        });
        return response.data;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Payment validation failed!");
    }
});
exports.SSLService = {
    initPayment,
    validatePayment,
};
