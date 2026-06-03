import DoctorScheduleInfo from "@/components/modules/DoctorSchedule/DoctorScheduleInfo";
import { getAllDoctorSchedule } from "@/service/DoctorScheduleService";

const DoctorSchedulePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const params = await searchParams;
  const limit = 10;
  const page = Number(params.page) || 1;

  const { data: doctorScheduleInfo,meta:metaData } = await getAllDoctorSchedule(
    String(page),
    String(limit),
  );


  console.log(metaData)

  return (
    <div>
      <DoctorScheduleInfo
        doctorScheduleInfo={doctorScheduleInfo || []}
        page={page}
        limit={limit || 10}
        total={metaData?.total || 0}
      />
    </div>
  );
};

export default DoctorSchedulePage;
