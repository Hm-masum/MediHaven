import PatientDetails from "@/components/modules/Patient/PatientDetails";
import { getPatientById } from "@/service/PatientService";

const PatientProfilePage = async({params}:{params: Promise<{ patientId: string }>}) => {
    const { patientId } = await params;
    const {data: patient} = await getPatientById(patientId);

    return (
        <div>
            <PatientDetails patient={patient} />
        </div>
    );
};

export default PatientProfilePage;