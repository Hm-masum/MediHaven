import PrescriptionCard from "@/components/modules/Prescription/PrescriptionCard";
import { getMyPrescription } from "@/service/PrescriptionService";
import { IPrescription } from "@/types";

const MyPrescriptionInfoPage = async () => {
  const { data: prescriptionData } = await getMyPrescription();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {prescriptionData?.map((prescription: IPrescription) => (
        <PrescriptionCard key={prescription.id} prescription={prescription} basePath="/dashboard/patient/my-prescription" />
      ))}
    </div>
  );
};

export default MyPrescriptionInfoPage;
