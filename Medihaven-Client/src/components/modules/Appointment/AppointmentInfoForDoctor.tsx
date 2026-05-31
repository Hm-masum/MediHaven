"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TLTable } from "@/components/ui/core/TLTable";
import { changeAppointmentStatus } from "@/service/AppointmentService";
import { IAppointment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AppointmentInfoForDoctor = ({
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

  const handleStatusChange = async (
    appointmentId: string,
    statusValue: string,
  ) => {
    try {
      const result = await changeAppointmentStatus(appointmentId, statusValue);
      if (result.success) {
        toast.success(result?.message);
      } else {
        toast.error(result?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

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
      accessorKey: "change-status",
      header: "Change Status",
      cell: ({ row }) => (
        <div>
          <select
            className="border rounded px-2 py-1 text-sm"
            defaultValue={row.original.status}
            onChange={(e) =>
              handleStatusChange(row.original.id, e.target.value)
            }
          >
            <option value="ALL">All</option>
            <option value="SCHEDULED">SCHEDULED</option>
            <option value="ONPROGRESS">ONPROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELED">CANCELED</option>
          </select>
        </div>
      ),
    },
    {
      accessorKey: "prescription",
      header: "Prescription",
      cell: ({ row }) => {
        const { status, prescription } = row.original;
        if (status !== "COMPLETED") {
          return (
            <span className="text-muted-foreground">
              Appointment Not Completed
            </span>
          );
        }
        if (status === "COMPLETED" && !prescription) {
          return <Button className="bg-linear-to-r from-purple-500 to-pink-500"><Link  href={`/dashboard/doctor/prescriptions/create/${row.original.id}`}>Create Prescription</Link></Button>;
        }
        return (
          <span className="text-green-600 font-medium">
            Prescription Available
          </span>
        );
      },
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
                  ? "border-purple-600 text-purple-600 bg-purple-50"
                  : "border-gray-300 text-gray-600 dark:text-gray-300 dark:hover:bg-gray-100"
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

export default AppointmentInfoForDoctor;
