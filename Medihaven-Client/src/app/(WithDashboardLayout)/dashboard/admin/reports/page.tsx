import PatientReportInfo from "@/components/modules/Report/PatientReportInfo";
import { getAllPatient } from "@/service/PatientService";
import { IPatient } from "@/types";

const PatientReportPage = async () => {
  const { data: patients } = await getAllPatient();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {patients?.data?.map((patient: IPatient) => (
        <PatientReportInfo key={patient?.id} patient={patient} />
      ))}
    </div>
  );
};

export default PatientReportPage;
