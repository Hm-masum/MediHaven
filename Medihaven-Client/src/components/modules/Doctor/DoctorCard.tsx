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

export default function DoctorCard({ doctorInfo }: { doctorInfo: IDoctor[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchTerm) params.set("searchTerm", searchTerm);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, router]);

  return (
    <div className="space-y-3">
      <Input
        placeholder="Search doctors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {doctorInfo?.map((doctor: IDoctor) => (
          <Card
            key={doctor.id}
            className="w-full rounded-2xl shadow-sm border p-4"
          >
            <CardContent className="p-0 space-y-4">
              {/* Top Section */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      className="rounded-full"
                      src={
                        doctor?.profilePhoto || "https://github.com/shadcn.png"
                      }
                    />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-lg">{doctor?.name}</h2>
                    <p className="text-sm text-gray-500">
                      {doctor?.qualification}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-1 text-yellow-500 text-sm">
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
                      <span className="text-gray-600 ml-1">
                        {doctor?.averageRating || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600 font-medium">
                  {doctor?.user?.status || "N/A"}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-100 rounded-xl p-3 text-center">
                  <p className="font-semibold">{doctor?.experience || "N/A"}</p>
                  <p className="text-xs text-gray-500">Exp</p>
                </div>
                <div className="bg-gray-100 rounded-xl p-3 text-center">
                  <p className="font-semibold">
                    {doctor?.appointmentFee || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">Fee</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-2">
                  <Eye size={16} /> View
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Calendar size={16} /> Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
