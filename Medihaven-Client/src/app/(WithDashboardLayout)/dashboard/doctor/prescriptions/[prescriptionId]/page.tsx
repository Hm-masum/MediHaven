import PrescriptionDetails from "@/components/modules/Prescription/PrescriptionDetails";
import { getSinglePrescription } from "@/service/PrescriptionService";

const PrescriptionDetailsPage = async ({
  params,
}: {
  params: Promise<{ prescriptionId: string }>;
}) => {
  const { prescriptionId } = await params;
  const { data: prescription } = await getSinglePrescription(prescriptionId);
  return (
    <div>
      <PrescriptionDetails prescription={prescription} />
    </div>
  );
};

export default PrescriptionDetailsPage;
