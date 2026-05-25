import PublicDoctorDetails from "@/components/modules/Doctor/PublicDoctorDetails";
import { getDoctorById } from "@/service/DoctorService";

const DoctorDetailsPage = async({params}:{params: Promise<{ doctorId: string }>}) => {
    const { doctorId } = await params;
    const {data: doctor} = await getDoctorById(doctorId);
    return (
        <div>
            <PublicDoctorDetails doctor={doctor}/>
        </div>
    );
};

export default DoctorDetailsPage;