import PrescriptionCard from "@/components/modules/Prescription/PrescriptionCard";
import { getAllPrescription } from "@/service/PrescriptionService";
import { IPrescription } from "@/types";

const PrescriptionInfoPage = async () => {
  const { data: prescriptionData } = await getAllPrescription();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {prescriptionData?.map((prescription: IPrescription) => (
        <PrescriptionCard key={prescription.id} prescription={prescription} />
      ))}
    </div>
  );
};

export default PrescriptionInfoPage;
