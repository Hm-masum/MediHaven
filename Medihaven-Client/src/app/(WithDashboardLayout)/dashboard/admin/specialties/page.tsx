import ManageSpecialties from "@/components/modules/Specialties/ManageSpecialties";
import { getAllSpecialties } from "@/service/SpecialtiesService";
import Link from "next/link";

const ManageSpecialtiesPage = async () => {
  const { data: specialtiesData } = await getAllSpecialties();
  return (
    <div>
      <div className="flex justify-end">
        <Link
          href="/dashboard/admin/specialties/create"
          className="px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-xl text-white mb-3 inline-block"
        >
          Create Specialties
        </Link>
      </div>

      <div>
        <ManageSpecialties specialties={specialtiesData} />
      </div>
    </div>
  );
};

export default ManageSpecialtiesPage;
