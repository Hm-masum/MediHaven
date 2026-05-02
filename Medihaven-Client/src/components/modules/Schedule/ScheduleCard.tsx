"use client";

import { Card, CardContent } from "@/components/ui/card";
import DeleteConfirmationModal from "@/components/ui/core/TLModal/DeleteConfirmationModal";
import { deleteSchedule } from "@/service/ScheduleService";
import { ISchedule } from "@/types";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ScheduleCard = ({ schedule }: { schedule: ISchedule }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: ISchedule) => {
    setSelectedId(data?.id);
    setSelectedItem(
      `${new Date(data.startDateTime).toLocaleDateString()} ${new Date(data.startDateTime).toLocaleTimeString()}`,
    );
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteSchedule(selectedId);
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

  return (
    <Card className="w-full rounded-2xl shadow-md border border-gray-200">
      <CardContent className="p-5 space-y-4">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Appointment Slot
          </h2>

          <div className="flex items-center gap-3">
            <span className="text-sm px-3.5 py-1.5 rounded-full bg-green-100 text-green-700">
              Active
            </span>
            <button
              className="text-red-500"
              title="Delete"
              onClick={() => handleDelete(schedule)}
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Date */}
        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="font-medium text-gray-800">
            {new Date(schedule.startDateTime).toLocaleDateString()}
          </p>
        </div>

        {/* Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Start Time</p>
            <p className="font-medium text-gray-800">
              {new Date(schedule.startDateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">End Time</p>
            <p className="font-medium text-gray-800">
              {new Date(schedule.endDateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t text-xs text-gray-400">
          Created: {new Date(schedule.createdAt).toLocaleDateString()}
        </div>
      </CardContent>

      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </Card>
  );
};

export default ScheduleCard;
