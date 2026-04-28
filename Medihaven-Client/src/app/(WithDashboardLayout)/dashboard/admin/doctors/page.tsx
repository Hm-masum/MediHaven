import DoctorCard from "@/components/modules/Doctor/DoctorCard";
import { getAllDoctor } from "@/service/DoctorService";

const DoctorsPage = async ({searchParams}: {searchParams: Promise<{ searchTerm?: string }>}) => {
  const { searchTerm } = await searchParams;
  const { data: doctorData } = await getAllDoctor(searchTerm);

  return (
    <div>
      <DoctorCard doctorInfo={doctorData?.data} />
    </div>
  );
};

export default DoctorsPage;
