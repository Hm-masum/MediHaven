"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TLTable } from "@/components/ui/core/TLTable";
import { initPayment } from "@/service/PaymentService";
import { IAppointment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AppointmentInfoForPatient = ({
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

  const makePayment = async (appointment: IAppointment) => {
    try {
      const result = await initPayment(appointment.id);
      if (result?.success) {
        window.location.href = result.data.paymentUrl;
      } else {
        toast.error(result?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  const videoCall = (link: string) => {
    window.open(link, "_blank");
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
      cell: ({ row }) => (
        <span>
          {row.original?.paymentStatus === "UNPAID" ? (
            <Button onClick={() => makePayment(row?.original)}>Pay Now</Button>
          ) : (
            row.original?.paymentStatus
          )}
        </span>
      ),
    },
    {
      accessorKey: "video-call",
      header: "Video Call",
      cell: ({ row }) => (
        <span>
          {row.original?.paymentStatus === "PAID" &&
          row.original?.status === "SCHEDULED" ? (
            <Button
              onClick={() => videoCall(row.original?.videoCallingId)}
              className="bg-linear-to-r from-purple-500 to-pink-500"
            >
              Call Now
            </Button>
          ) : (
            <span className="text-green-600 font-medium">
              Call is not avilable
            </span>
          )}
        </span>
      ),
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
    {
      accessorKey: "review",
      header: "Review",
      cell: ({ row }) => {
        const { status, review } = row.original;
        if (status !== "COMPLETED") {
          return (
            <span className="text-muted-foreground">
              Appointment Not Completed
            </span>
          );
        }
        if (status === "COMPLETED" && !review) {
          return (
            <Button className="bg-linear-to-r from-purple-500 to-pink-500">
              <Link
                href={`/dashboard/patient/review/create/${row.original.id}`}
              >
                Create Review
              </Link>
            </Button>
          );
        }
        return (
          <span className="text-green-600 font-medium">
            Review Created
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

export default AppointmentInfoForPatient;
