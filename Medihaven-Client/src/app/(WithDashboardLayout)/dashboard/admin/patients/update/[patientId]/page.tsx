import UpdatePatientByAdminForm from "@/components/modules/Profile/UpdatePatientByAdminForm";
import { getPatientById } from "@/service/PatientService";

const UpdatePatientByAdminPage = async({params}:{params: Promise<{ patientId: string }>}) => {
    const{ patientId }= await params;
    const {data:patiendData} = await getPatientById(patientId);
    return (
        <div>
            <UpdatePatientByAdminForm patientData={patiendData} />
        </div>
    );
};

export default UpdatePatientByAdminPage;