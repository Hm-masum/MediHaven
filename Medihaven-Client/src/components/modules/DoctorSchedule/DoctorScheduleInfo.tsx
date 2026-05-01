"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TLTable } from "@/components/ui/core/TLTable";
import { IDoctorSchedule } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

const DoctorScheduleInfo = ({
  doctorScheduleInfo,
}: {
  doctorScheduleInfo: IDoctorSchedule[];
}) => {

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
              src={row.original?.doctor?.profilePhoto || "https://github.com/shadcn.png"}
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
    </div>
  );
};

export default DoctorScheduleInfo;
