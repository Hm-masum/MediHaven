import AppointmentInfoForPatient from "@/components/modules/Appointment/AppointmentInfoForPatient";
import { getMyAppointment } from "@/service/AppointmentService";

const MyApppointmentInfo = async ({searchParams}: {searchParams: Promise<{ status?: string }>}) => {

  const { status } = await searchParams;
  const { data: appointmentInfo } = await getMyAppointment(status);
  
  return (
    <div>
      <AppointmentInfoForPatient appointmentInfo={appointmentInfo?.data} />
    </div>
  );
};

export default MyApppointmentInfo;