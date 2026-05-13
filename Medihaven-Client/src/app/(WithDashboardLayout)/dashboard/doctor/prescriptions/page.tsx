import ManagePrescription from "@/components/modules/Prescription/ManagePrescription";
import { getDoctorPrescription } from "@/service/PrescriptionService";

const  ManagePrescriptionPage = async({searchParams}: {searchParams: Promise<{ searchTerm?: string }>}) => {
  const { searchTerm } = await searchParams;

const { data: prescriptionData } = await getDoctorPrescription(searchTerm);
  return (
    <div>
      <ManagePrescription prescriptionData={prescriptionData} />
    </div>
  );
};

export default ManagePrescriptionPage;
