import ScheduleCard from "@/components/modules/Schedule/ScheduleCard";
import { getAllSchedule } from "@/service/ScheduleService";
import { ISchedule } from "@/types";

const SchedulePage = async () => {
  const { data: ScheduleInfo } = await getAllSchedule();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {ScheduleInfo.data.map((schedule: ISchedule) => (
          <ScheduleCard key={schedule.id} schedule={schedule} />
        ))}
      </div>
      
      {/* 
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i}
            href={`?page=${i + 1}`}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div> */}
    </div>
  );
};

export default SchedulePage;
