"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IDoctor } from "@/types/doctor";
import Image from "next/image";

export default function PublicDoctorCard({ doctor }: { doctor: IDoctor }) {
  return (
    <Card className="group overflow-hidden rounded-3xl border border-violet-100 py-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)]">
      <div className="relative flex h-50 items-center justify-center bg-linear-to-br from-violet-100 to-fuchsia-150">
        <div className="absolute bottom-4 right-4 rounded-full bg-linear-to-r from-violet-500 to-pink-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
          {doctor?.doctorSpecialties[0].specialties?.title}
        </div>

        <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-purple-400 bg-linear-to-br from-purple-400 to-pink-400 shadow-lg">
          <Image
            src={doctor?.profilePhoto || "/doctor-placeholder.png"}
            alt={doctor?.name || "Doctor"}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="mb-1 text-lg font-semibold">{doctor.name}</h3>

        <p className="mb-4 text-sm text-[#7c5fa0] dark:text-gray-300">
          {doctor.qualification} · {doctor.experience}
          {" yrs exp"}
        </p>

        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(doctor.averageRating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-amber-300"
                }`}
              />
            ))}

            <span className="ml-1 text-sm font-medium text-[#5b4270] dark:text-gray-300">
              {doctor.averageRating}
            </span>
          </div>

          <span className="text-sm font-semibold">
            ৳{doctor.appointmentFee}
            {" / visit"}
          </span>
        </div>

        <Button
          asChild
          className="h-11 w-full rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-sm font-medium text-white hover:opacity-90"
        >
          <Link href={`/doctors/${doctor?.id}`}>Book Now</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
