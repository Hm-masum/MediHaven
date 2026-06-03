import DoctorCard from "@/components/modules/Doctor/DoctorCard";
import { getAllDoctor } from "@/service/DoctorService";
import { IDoctor } from "@/types/doctor";
import Link from "next/link";

const DoctorsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const params =await searchParams;
  const limit = 9;
  const page = Number(params.page) || 1;

  const { data: doctorData } = await getAllDoctor(undefined,undefined,undefined, page, limit);

  const meta = doctorData?.meta;
  const totalPage = meta?.total ? Math.ceil(meta.total / limit) : 1;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {doctorData?.data.length ? (
          doctorData?.data?.map((doctor: IDoctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))
        ) : (
          <div className="col-span-full flex justify-center py-10">
            <p className="text-purple-500">No doctors found.</p>
          </div>
        )}
      </div>

      {/* pagination */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        <Link
         href={`?page=${page - 1}`}
          className={`px-3 py-1 border rounded ${
            page === 1 ? "pointer-events-none opacity-50" : "hover:bg-gray-100"
          }`}
        >
          Prev
        </Link>

        {Array.from({ length: totalPage }, (_, i) => (
          <Link
            key={i}
            href={`?page=${i + 1}`}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </Link>
        ))}

        <Link
          href={`?page=${page + 1}`}
          className={`px-3 py-1 border rounded ${
            page === totalPage
              ? "pointer-events-none opacity-50"
              : "hover:bg-gray-100"
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default DoctorsPage;
