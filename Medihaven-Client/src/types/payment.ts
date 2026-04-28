import { IAppointment } from "./appointment";
import { IPaymentStatus } from "./utils";

export type IPayment = {
  id: string;
  appointmentId: string;
  appointment: IAppointment;
  amount: number;
  transactionId: string;
  status?: IPaymentStatus;
  paymentGatewayData?: any;
  createdAt: Date;
  updatedAt: Date;
};