"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DeleteConfirmationModal from "@/components/ui/core/TLModal/DeleteConfirmationModal";
import { TLTable } from "@/components/ui/core/TLTable";
import { deleteSpecialties } from "@/service/SpecialtiesService";
import { IDoctorSchedule } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const MyDoctorSchedulesInfo = ({
  doctorScheduleInfo,
}: {
  doctorScheduleInfo: IDoctorSchedule[];
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: IDoctorSchedule) => {
    setSelectedId(data?.scheduleId);
    setSelectedItem("this doctor schedule");
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteSpecialties(selectedId);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  const columns: ColumnDef<IDoctorSchedule>[] = [
    {
      accessorKey: "id",
      header: "ID",
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
    {
      accessorKey: "action2",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <button
          className="text-red-500"
          title="Delete"
          onClick={() => handleDelete(row.original)}
        >
          <Trash className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <TLTable columns={columns} data={doctorScheduleInfo || []} />

      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default MyDoctorSchedulesInfo;
