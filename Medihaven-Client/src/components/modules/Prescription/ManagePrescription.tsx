"use client";

import { Button } from "@/components/ui/button";
import { TLTable } from "@/components/ui/core/TLTable";
import { IPrescription } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

const ManagePrescription = ({
  prescriptionData,
}: {
  prescriptionData: IPrescription[];
}) => {
  const router = useRouter();

  const columns: ColumnDef<IPrescription>[] = [
    {
      accessorKey: "doctorName",
      header: "Doctor Name",
      cell: ({ row }) => <span>{row.original.doctor.name}</span>,
    },
    {
      accessorKey: "patientName",
      header: "Patient Name",
      cell: ({ row }) => <span>{row.original.patient.name}</span>,
    },
    {
      accessorKey: "followUpDate",
      header: "Follow-Up Date",
      cell: ({ row }) => <span>{new Date(row.original.followUpDate || "").toLocaleDateString()}</span>,
    },
    {
      accessorKey: "Details",
      header: "Details",
      cell: ({ row }) => (
        <Button
          className="bg-purple-700 text-white px-3 py-1 rounded-md hover:bg-purple-600 transition-colors cursor-pointer"
          onClick={() =>
            router.push(
              `/dashboard/doctor/prescriptions/${row.original.id}`,
            )
          }
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <div>
      <TLTable columns={columns} data={prescriptionData || []} />
    </div>
  );
};

export default ManagePrescription;
