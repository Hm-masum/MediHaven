import UpdateSpecialtiesForm from "@/components/modules/Specialties/UpdateSpecialtiesForm";
import { getSingleSpecialties } from "@/service/SpecialtiesService";

const UpdateSpecialtiesPage = async ({params}:{params: Promise<{ specialtiesId: string }>;}) => {
  const { specialtiesId } = await params;
   const { data: specialtiesData } = await getSingleSpecialties(specialtiesId);
  return (
    <div className="flex items-center justify-center">
      <UpdateSpecialtiesForm specialtiesData={specialtiesData} />
    </div>
  );
};

export default UpdateSpecialtiesPage;