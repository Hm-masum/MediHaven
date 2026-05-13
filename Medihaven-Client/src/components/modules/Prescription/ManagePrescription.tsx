"use client";

import { Button } from "@/components/ui/button";
import { TLTable } from "@/components/ui/core/TLTable";
import { Input } from "@/components/ui/input";
import { IPrescription } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ManagePrescription = ({
  prescriptionData,
}: {
  prescriptionData: IPrescription[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchTerm) params.set("searchTerm", searchTerm);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, router]);

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
      cell: ({ row }) => (
        <span>
          {new Date(row.original.followUpDate || "").toLocaleDateString()}
        </span>
      ),
    },
    {
      accessorKey: "Details",
      header: "Details",
      cell: ({ row }) => (
        <Button
          className="bg-purple-700 text-white px-3 py-1 rounded-md hover:bg-purple-600 transition-colors cursor-pointer"
          onClick={() =>
            router.push(`/dashboard/doctor/prescriptions/${row.original.id}`)
          }
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Search by patients name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <TLTable columns={columns} data={prescriptionData || []} />
    </div>
  );
};

export default ManagePrescription;
