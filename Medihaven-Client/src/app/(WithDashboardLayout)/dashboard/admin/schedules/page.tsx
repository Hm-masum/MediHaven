import ScheduleCard from "@/components/modules/Schedule/ScheduleCard";
import { getAllSchedule } from "@/service/ScheduleService";
import { ISchedule } from "@/types";
import Link from "next/link";

const SchedulePage = async ({searchParams}: {searchParams: Promise<{ page?: string }>}) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 9;
  const { data: ScheduleInfo } = await getAllSchedule(page, limit);
  const meta = ScheduleInfo?.meta;
  const totalPage = Math.ceil((meta?.total || 0) / limit);

  return (
    <div>
      {/* Create Schedule Button */}
      <div className="flex justify-end">
        <Link
          href="/dashboard/admin/schedules/create"
          className="px-4 py-2 bg-blue-500 rounded-xl text-white mb-3 inline-block"
        >
          Create Schedule
        </Link>
      </div>

       {/* Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {ScheduleInfo.data.map((schedule: ISchedule) => (
          <ScheduleCard key={schedule.id} schedule={schedule} />
        ))}
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

export default SchedulePage;
