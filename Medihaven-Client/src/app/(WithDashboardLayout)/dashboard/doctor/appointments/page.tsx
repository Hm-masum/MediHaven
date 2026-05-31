import AppointmentInfoForDoctor from "@/components/modules/Appointment/AppointmentInfoForDoctor";
import { getMyAppointment } from "@/service/AppointmentService";

const DoctorApppointmentInfoPage = async ({searchParams}: {searchParams: Promise<{ status?: string }>}) => {

  const { status } = await searchParams;
  const { data: appointmentInfo } = await getMyAppointment(status);
  
  return (
    <div>
      <AppointmentInfoForDoctor appointmentInfo={appointmentInfo?.data} />
    </div>
  );
};

export default DoctorApppointmentInfoPage;