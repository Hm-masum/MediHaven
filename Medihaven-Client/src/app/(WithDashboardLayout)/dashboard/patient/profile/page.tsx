import PatientProfile from "@/components/modules/Profile/PatientProfile";
import { getMe } from "@/service/UserService";

const PatientProfilePage = async() => {
    const { data: patient } = await getMe()
    return (
        <div>
            <PatientProfile patient={patient}/>
        </div>
    );
};

export default PatientProfilePage;