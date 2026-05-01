import DoctorScheduleInfo from "@/components/modules/DoctorSchedule/DoctorScheduleInfo";
import { getAllDoctorSchedule } from "@/service/DoctorScheduleService";

const DoctorSchedulePage = async () => {
    const { data: doctorScheduleInfo } = await getAllDoctorSchedule();
    
    return (
        <div>
            <DoctorScheduleInfo doctorScheduleInfo={doctorScheduleInfo} />
        </div>
    );
};

export default DoctorSchedulePage;