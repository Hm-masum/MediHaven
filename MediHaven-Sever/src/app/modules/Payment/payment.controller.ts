import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { PaymentService } from "./payment.service";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IAuthUser } from "../../interfaces/common";

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

const getAllPayments = catchAsync(async (req: Request, res: Response) => {
    const result = await PaymentService.getAllPayments();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payments retrieve successfully",
      data: result,
    });
  }
);

const getMyPayments = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await PaymentService.getMyPayments(user?.email as string);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My Payments retrieve successfully",
      data: result,
    });
  }
);

export const PaymentController = {
  initPayment,
  validatePayment,
  getAllPayments,
  getMyPayments
};
      
