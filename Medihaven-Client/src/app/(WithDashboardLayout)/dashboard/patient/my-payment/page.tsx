import PaymentsInfo from "@/components/modules/Payment/PaymentInfo";
import { getMyPayments } from "@/service/PaymentService";

const MyPaymentInfoPage = async() => {

const { data: paymentData } = await getMyPayments();
  return (
    <div>
      <PaymentsInfo paymentsData={paymentData} />
    </div>
  );
};

export default MyPaymentInfoPage;
