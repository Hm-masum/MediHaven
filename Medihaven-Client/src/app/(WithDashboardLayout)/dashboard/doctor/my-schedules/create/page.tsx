import AddSchedule from "@/components/modules/DoctorSchedule/AddSchedule";
import { getAllSchedule } from "@/service/ScheduleService";
import Link from "next/link";

const AddSchedulePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 9;
  const { data: scheduleInfo } = await getAllSchedule(page, limit);
  const meta = scheduleInfo?.meta;
  const totalPage = Math.ceil((meta?.total || 0) / limit);

  return (
    <div>
      <div className="flex items-center justify-center">
        <AddSchedule schedules={scheduleInfo?.data} />
      </div>

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

export default AddSchedulePage;
