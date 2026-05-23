
import UpdateDoctorForm from "@/components/modules/Profile/UpdateDoctorForm";
import { getAllSpecialties } from "@/service/SpecialtiesService";
import { getMe } from "@/service/UserService";

const UpdateDoctorPage = async() => {
        const { data: doctorData } = await getMe()
        const { data: specialties } = await getAllSpecialties()
    return (
        <div>
            <UpdateDoctorForm doctorData={doctorData} specialties={specialties}/>
        </div>
    );
};

export default UpdateDoctorPage;