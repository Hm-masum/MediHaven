import MyDoctorSchedulesInfo from "@/components/modules/DoctorSchedule/MyDoctorSchedulesInfo";
import { getMySchedule } from "@/service/DoctorScheduleService";
import Link from "next/link";

const MyDoctorSchedulePage = async () => {
  const { data: doctorScheduleInfo } = await getMySchedule();

  return (
    <div>
      <div className="flex justify-end">
        <Link
          href="/dashboard/doctor/my-schedules/create"
          className="px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-xl text-white mb-3 inline-block"
        >
          Add Schedule
        </Link>
      </div>

      <MyDoctorSchedulesInfo doctorScheduleInfo={doctorScheduleInfo.data} />
    </div>
  );
};

export default MyDoctorSchedulePage;
