import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { PaymentService } from "./payment.service";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";

const initPayment = catchAsync(async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
  const result = await PaymentService.initPayment(appointmentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment initialize successfully",
    data: result,
  });
});

const validatePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.validatePayment(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Validate Payment successfully",
    data: result,
  });
});

export const PaymentController = {
  initPayment,
  validatePayment,
};
