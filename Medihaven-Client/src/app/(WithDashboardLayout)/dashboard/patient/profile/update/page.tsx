import UpdatePatientForm from "@/components/modules/Profile/UpdatePatientForm";
import { getMe } from "@/service/UserService";

const UpdatePatientProfile = async () => {
    const { data: patientData } = await getMe()
    return (
        <div>
            <UpdatePatientForm patientData={patientData}/>
        </div>
    );
};

export default UpdatePatientProfile;