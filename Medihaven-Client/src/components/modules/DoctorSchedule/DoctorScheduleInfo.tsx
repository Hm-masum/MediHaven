"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TLTable } from "@/components/ui/core/TLTable";
import { IDoctorSchedule } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

const DoctorScheduleInfo = ({
  doctorScheduleInfo,
  page,
  limit,
  total,
}: {
  doctorScheduleInfo: IDoctorSchedule[];
  page: number;
  limit: number;
  total: number;
}) => {
  const totalPage = total ? Math.ceil(total / limit) : 1;
  
  const columns: ColumnDef<IDoctorSchedule>[] = [
    {
      accessorKey: "id",
      header: "Schedule Id",
      cell: ({ row }) => <span>{row.original.scheduleId}</span>,
    },
    {
      accessorKey: "doctor",
      header: "Doctor",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              className="rounded-full"
              src={
                row.original?.doctor?.profilePhoto ||
                "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>icon</AvatarFallback>
          </Avatar>
          <span>{row.original?.doctor?.name || "N/A"}</span>
        </div>
      ),
    },
    {
      accessorKey: "booked",
      header: "Booked",
      cell: ({ row }) => <span>{row.original.isBooked ? "Yes" : "No"}</span>,
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => (
        <span>
          {row.original?.schedule?.startDateTime
            ? new Date(row.original.schedule.startDateTime).toLocaleTimeString()
            : "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <span>
          {row.original?.schedule?.startDateTime
            ? new Date(row.original.schedule.startDateTime).toLocaleDateString()
            : "N/A"}
        </span>
      ),
    },
  ];

  return (
    <div>
      <TLTable columns={columns} data={doctorScheduleInfo || []} />

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

export default DoctorScheduleInfo;
