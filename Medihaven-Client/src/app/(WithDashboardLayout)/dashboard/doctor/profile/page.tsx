import DoctorProfile from "@/components/modules/Profile/DoctorProfile";
import { getMe } from "@/service/UserService";

const DoctorProfilePage = async() => {
    const { data: doctor } = await getMe()
    return (
        <div>
            <DoctorProfile doctor={doctor}/>
        </div>
    );
};

export default DoctorProfilePage;