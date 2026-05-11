import ManagePrescription from "@/components/modules/Prescription/ManagePrescription";
import { getDoctorPrescription } from "@/service/PrescriptionService";

const  ManagePrescriptionPage = async() => {

const { data: prescriptionData } = await getDoctorPrescription();
  return (
    <div>
      <ManagePrescription prescriptionData={prescriptionData} />
    </div>
  );
};

export default ManagePrescriptionPage;
