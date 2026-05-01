"use client";

import { Card, CardContent } from "@/components/ui/card";

const ScheduleCard = ({ schedule }: any) => {
  return (
    <Card className="w-full rounded-2xl shadow-md border border-gray-200">
      <CardContent className="p-5 space-y-4">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Appointment Slot
          </h2>
          <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
            Active
          </span>
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
          Created:{" "}
          {new Date(schedule.createdAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;