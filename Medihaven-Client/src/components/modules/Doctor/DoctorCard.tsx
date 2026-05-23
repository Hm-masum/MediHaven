"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Calendar } from "lucide-react";
import { IDoctor } from "@/types/doctor";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function DoctorCard({
  doctorInfo,
}: {
  doctorInfo: IDoctor[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchTerm) {
        params.set("searchTerm", searchTerm);
      }
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm, router, pathname]);

  return (
    <div className="space-y-3">
      <Input
        placeholder="Search doctors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {doctorInfo?.map((doctor: IDoctor) => (
          <Card
            key={doctor.id}
            className="w-full rounded-2xl border p-4 shadow-sm"
          >
            <CardContent className="space-y-4 p-0">
              {/* Top Section */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      className="rounded-full object-cover"
                      src={
                        doctor?.profilePhoto ||
                        "https://github.com/shadcn.png"
                      }
                    />

                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>

                  <div>
                    <h2 className="text-lg font-semibold">
                      {doctor?.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {doctor?.qualification}
                    </p>

                    {/* Rating */}
                    <div className="mt-1 flex items-center gap-1 text-sm text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < Math.round(doctor?.averageRating || 0)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-1 text-gray-600 dark:text-gray-400">
                        {doctor?.averageRating || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-600">
                  {doctor?.user?.status || "N/A"}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-100 p-3 text-center dark:bg-black">
                  <p className="font-semibold">
                    {doctor?.experience || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">Experience</p>
                </div>

                <div className="rounded-xl bg-gray-100 p-3 text-center dark:bg-black">
                  <p className="font-semibold">
                    ৳ {doctor?.appointmentFee || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">Appointment Fee</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <Link
                    href={`/dashboard/admin/doctors/view/${doctor.id}`}
                    className="flex w-full items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    View
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <Calendar size={16} />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Schedule Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedDoctor.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Doctor Schedules
                </p>
              </div>

              <Button
                className="bg-linear-to-r from-purple-500 to-pink-500"
                onClick={() => setSelectedDoctor(null)}
              >
                Close
              </Button>
            </div>

            {/* Schedule List */}
            <div className="space-y-3">
              {selectedDoctor.doctorSchedules?.length > 0 ? (
                selectedDoctor.doctorSchedules.map((scheduleItem) => (
                  <div
                    key={scheduleItem.scheduleId}
                    className="flex items-center justify-between rounded-xl border p-4"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">
                        Start Time:
                        {" "}
                        {new Date(
                          scheduleItem.schedule.startDateTime
                        ).toLocaleString()}
                      </p>

                      <p className="text-sm text-gray-500">
                        End Time:
                        {" "}
                        {new Date(
                          scheduleItem.schedule.endDateTime
                        ).toLocaleString()}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        scheduleItem.isBooked
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {scheduleItem.isBooked
                        ? "Booked"
                        : "Available"}
                    </span>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border p-5 text-center text-gray-500">
                  No schedules available
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}