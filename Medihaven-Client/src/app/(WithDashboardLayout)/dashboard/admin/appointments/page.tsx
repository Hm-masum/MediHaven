import AppointmentInfo from "@/components/modules/Appointment/AppointmentInfo";
import { getAllAppointment } from "@/service/AppointmentService";

const ApppointmentInfoPage = async ({searchParams}: {searchParams: Promise<{ status?: string }>}) => {

  const { status } = await searchParams;
  const { data: appointmentInfo } = await getAllAppointment(status);
  
  return (
    <div>
      <AppointmentInfo appointmentInfo={appointmentInfo?.data} />
    </div>
  );
};

export default ApppointmentInfoPage;
