import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IMedicalReport, IPatient } from "@/types";
import { Eye } from "lucide-react";
import Link from "next/link";

const PatientReportInfo = async ({ patient }: { patient: IPatient }) => {
  return (
    <div
      key={patient.id}
      className="flex items-center justify-between p-4 border rounded-md bg-white shadow-sm"
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            className="rounded-full"
            src={patient?.profilePhoto || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>patient</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-lg font-semibold">{patient?.name || "N/A"}</h4>
          <p className="text-gray-500 text-xs">
            {patient?.patientHealthData?.bloodGroup || "N/A"}
          </p>
        </div>
      </div>

      {patient.medicalReport?.length > 0 ? (
        patient.medicalReport.map((report: IMedicalReport) => (
          <div key={report.id} className="mb-2">
            <Link href={report?.reportLink}>
              <Button variant="outline" className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                {report?.reportName}
              </Button>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reports available</p>
      )}
    </div>
  );
};

export default PatientReportInfo;
