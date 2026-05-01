"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TLTable } from "@/components/ui/core/TLTable";
import { IAppointment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AppointmentInfo = ({
  appointmentInfo,
}: {
  appointmentInfo: IAppointment[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState(searchParams.get("status") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (status && status !== "All") {
        params.set("status", status.toUpperCase());
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(timer);
  }, [status, router]);

  const columns: ColumnDef<IAppointment>[] = [
    {
      accessorKey: "name",
      header: "Patient",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              className="rounded-full"
              src={
                row.original?.patient?.profilePhoto ||
                "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <span>{row.original?.patient?.name || "N/A"}</span>
        </div>
      ),
    },
    {
      accessorKey: "doctor",
      header: "Doctor",
      cell: ({ row }) => <span>{row.original?.doctor?.name || "N/A"}</span>,
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
    {
      accessorKey: "payment",
      header: "Payment",
      cell: ({ row }) => <span>{row.original?.paymentStatus || "N/A"}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <span>{row.original?.status || "N/A"}</span>,
    },
    {
      accessorKey: "fee",
      header: "Fee",
      cell: ({ row }) => (
        <span>{row.original?.doctor?.appointmentFee || "N/A"}</span>
      ),
    },
  ];

  const tabs = ["All", "SCHEDULED", "ONPROGRESS", "COMPLETED", "CANCELED"];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {tabs.map((item) => {
          const active = (item === "All" && status === "") || item === status;

          return (
            <button
              key={item}
              onClick={() => setStatus(item === "All" ? "" : item)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
                active
                  ? "border-green-700 text-green-700 bg-green-50"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <TLTable columns={columns} data={appointmentInfo || []} />
    </div>
  );
};

export default AppointmentInfo;
