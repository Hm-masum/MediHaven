"use client";

import { useState } from "react";
import { Calendar, Clock, Check } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ISchedule } from "@/types";
import { createDoctorSchedule } from "@/service/DoctorScheduleService";
import { toast } from "sonner";

export default function CreateSchedule({
  schedules,
}: {
  schedules: ISchedule[];
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleSchedule = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const formatTime = (date: string | Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const payload = {
        scheduleIds: selectedIds,
      };
      console.log("Payload for creating schedule:", payload);

      const res = await createDoctorSchedule(payload)
      if(res.success){
        toast.success("Schedule created successfully");
        setSelectedIds([]);
      }
      else{
        toast.error(res.message || "Failed to create schedule");
      }

    } catch (error) {
      toast.error("An error occurred while creating the schedule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full p-6">

      <Card className="rounded-3xl border bg-white p-6 shadow-sm">
        {schedules.length === 0 ? (
          <div className="flex h-60 flex-col items-center justify-center">
            <Calendar className="mb-4 h-12 w-12 text-muted-foreground/40" />

            <p className="text-muted-foreground">
              No schedules available
            </p>
          </div>
        ) : (
          <>
            {/* show available schedules */}
            <div className="mt-4">
              <h3 className="mb-4 text-lg font-semibold">
                Available Schedules
              </h3>

              <div className="flex flex-wrap gap-4">
                {schedules.map((schedule) => {
                  const isSelected = selectedIds.includes(
                    schedule.id
                  );

                  return (
                    <button
                      key={schedule.id}
                      type="button"
                      onClick={() =>
                        toggleSchedule(schedule.id)
                      }
                      className={`flex items-center gap-3 rounded-2xl border px-5 py-4 transition-all ${
                        isSelected
                          ? "border-violet-600 bg-violet-600 text-white"
                          : "border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          isSelected
                            ? "bg-white/20"
                            : "bg-violet-100"
                        }`}
                      >
                        {isSelected ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Clock className="h-5 w-5 text-violet-600" />
                        )}
                      </div>

                      <div className="flex flex-col items-start">
                        <span
                          className={`text-xs ${
                            isSelected
                              ? "text-violet-100"
                              : "text-muted-foreground"
                          }`}
                        >
                          {formatDate(
                            schedule.startDateTime
                          )}
                        </span>

                        <span className="font-medium">
                          {formatTime(
                            schedule.startDateTime
                          )}{" "}
                          -{" "}
                          {formatTime(
                            schedule.endDateTime
                          )}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Schedules */}
            <div className="mt-8 rounded-2xl border border-dashed p-5 min-h-35">
              {selectedIds.length === 0 ? (
                <div className="flex h-full min-h-22.5 items-center justify-center text-sm text-muted-foreground">
                  No slots selected yet
                </div>
              ) : (
                <>
                  <h3 className="mb-4 text-lg font-semibold">
                    Selected Schedules
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {schedules
                      .filter((schedule) =>
                        selectedIds.includes(
                          schedule.id
                        )
                      )
                      .map((schedule) => (
                        <div
                          key={schedule.id}
                          className="rounded-2xl bg-violet-100 px-4 py-3 text-violet-700"
                        >
                          <p className="text-xs">
                            {formatDate(
                              schedule.startDateTime
                            )}
                          </p>

                          <p className="font-medium">
                            {formatTime(
                              schedule.startDateTime
                            )}{" "}
                            -{" "}
                            {formatTime(
                              schedule.endDateTime
                            )}
                          </p>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="mt-10 flex items-center justify-between border-t pt-5">
              <p className="text-sm text-muted-foreground">
                {selectedIds.length === 0
                  ? "No slots selected yet"
                  : `${selectedIds.length} slot(s) selected`}
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedIds([])}
                  disabled={selectedIds.length === 0}
                >
                  Clear
                </Button>

                <Button
                  onClick={handleConfirm}
                  disabled={
                    loading ||
                    selectedIds.length === 0
                  }
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  {loading
                    ? "Submitting..."
                    : "Confirm Schedule"}
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}