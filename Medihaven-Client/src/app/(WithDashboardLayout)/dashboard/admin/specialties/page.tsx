import ManageSpecialties from "@/components/modules/Specialties/ManageSpecialties";
import { getAllSpecialties } from "@/service/SpecialtiesService";

const ManageSpecialtiesPage = async () => {
  const { data: specialtiesData } = await getAllSpecialties();
  return (
    <div>
      <ManageSpecialties specialties={specialtiesData} />
    </div>
  );
};

export default ManageSpecialtiesPage;
