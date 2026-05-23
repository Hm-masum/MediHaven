import DoctorDetails from "@/components/modules/Doctor/DoctorDetails";
import { getDoctorById } from "@/service/DoctorService";

const DoctorProfilePage = async({params}:{params: Promise<{ doctorId: string }>}) => {
    const { doctorId } = await params;
    const {data: doctor} = await getDoctorById(doctorId);

    return (
        <div>
            <DoctorDetails doctor={doctor} />
        </div>
    );
};

export default DoctorProfilePage;