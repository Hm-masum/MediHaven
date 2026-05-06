import AppointmentInfo from "@/components/modules/Appointment/AppointmentInfo";
import { getMyAppointment } from "@/service/AppointmentService";

const MyApppointmentInfo = async ({searchParams}: {searchParams: Promise<{ status?: string }>}) => {

  const { status } = await searchParams;
  const { data: appointmentInfo } = await getMyAppointment(status);
  
  return (
    <div>
      <AppointmentInfo appointmentInfo={appointmentInfo?.data} />
    </div>
  );
};

export default MyApppointmentInfo;