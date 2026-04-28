import ManagePatient from "@/components/modules/Patient/ManagePatient";
import { getAllPatient } from "@/service/PatientService";

const ManagePatientPage = async ({searchParams}: {searchParams: Promise<{ searchTerm?: string }>}) => {
  const { searchTerm } = await searchParams;
  const { data: patientData } = await getAllPatient(searchTerm);
  
  return (
    <div>
      <ManagePatient patientInfo={patientData?.data} />
    </div>
  );
};

export default ManagePatientPage;
