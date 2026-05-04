import PaymentsInfo from "@/components/modules/Payment/PaymentInfo";
import { getAllPayments } from "@/service/PaymentService";

const PaymentInfoPage = async() => {

const { data: paymentData } = await getAllPayments();
  return (
    <div>
      <PaymentsInfo paymentsData={paymentData} />
    </div>
  );
};

export default PaymentInfoPage;
