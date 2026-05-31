import prisma from "../../../shared/prisma";
import { SSLService } from "../SSL/ssl.service";
import { PaymentStatus } from "@prisma/client";

const initPayment = async (appointmentId: string) => {
  const paymentData = await prisma.payment.findFirstOrThrow({
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
    amount: paymentData?.amount,
    transactionId: paymentData?.transactionId,
    name: paymentData?.appointment?.patient?.name,
    email: paymentData?.appointment?.patient?.email,
    address: paymentData?.appointment?.patient?.address,
    contactNumber: paymentData?.appointment?.patient?.contactNumber,
  };

  const result = await SSLService.initPayment(initPaymentData);

  return {
    paymentUrl: result.GatewayPageURL,
  };
};

const validatePayment = async (payload: any) => {
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

  const tranId = payload?.tran_id;

  if (!tranId) {
    throw new Error("tran_id missing from SSL response");
  }
  const response = await SSLService.validatePayment(payload);

  await prisma.$transaction(async (tx) => {
    const updatedPaymentData = await tx.payment.update({
      where: {
        transactionId: response?.tran_id,
      },
      data: {
        status: PaymentStatus.PAID,
        paymentGatewayData: response,
      },
    });

    await tx.appointment.update({
      where: {
        id: updatedPaymentData.appointmentId,
      },
      data: {
        paymentStatus: PaymentStatus.PAID,
      },
    });
  });

  return {
    message: "Payment validated successfully!",
  };
};

const getAllPayments = async () => {
  const payments = await prisma.payment.findMany({
    include: {
      appointment: {
        include: {
          patient: true,
          doctor: true,
        },
      },
    },
  });
  return payments;
};

const getMyPayments = async (email: string) => {
  const payments = await prisma.payment.findMany({
    where: {
      OR: [
        {
          appointment: {
            patient: {
              email: email,
            },
          },
        },
        {
          appointment: {
            doctor: {
              email: email,
            },
          },
        },
      ],
    },
    include: {
      appointment: {
        include: {
          patient: true,
          doctor: true,
        },
      },
    },
  });
  return payments;
};

export const PaymentService = {
  initPayment,
  validatePayment,
  getAllPayments,
  getMyPayments
};
