"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, Phone, Mail } from "lucide-react";
import { IDoctor } from "@/types/doctor";

export default function DoctorDetails({ doctor }: { doctor: IDoctor }) {
  return (
    <div className="mx-auto py-2">
      <Card className="overflow-hidden border shadow-sm">
        <div className="h-36 bg-linear-to-r from-purple-500 to-pink-500" />

        <CardContent className="relative px-6 pb-8">
          {/* Profile Top */}
          <div className="-mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-4 border-white bg-white shadow">
                <Image
                  src={doctor?.profilePhoto || "/default-profile.png"}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <h1 className="text-xl md:text-3xl font-bold">
                    {doctor.name}
                  </h1>

                <p className="text-muted-foreground text-lg">
                  {doctor.designation}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-yellow-500" />
                    <span className="font-medium">{doctor.averageRating}</span>
                  </div>

                  <Badge variant="outline">
                    {doctor.experience} Years Experience
                  </Badge>

                  <Badge variant="outline">
                    Reg: {doctor.registrationNumber}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-muted/40 px-5 py-4 text-center">
              <p className="text-sm text-muted-foreground">Appointment Fee</p>
              <h2 className="text-xl md:text-3xl font-bold text-primary">
                ৳{doctor.appointmentFee}
              </h2>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Details Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Information</CardTitle>
                </CardHeader>

                <CardContent className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Qualification
                    </p>
                    <p className="font-medium">{doctor.qualification}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Gender</p>
                    <p className="font-medium">{doctor.gender}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Current Workplace
                    </p>
                    <p className="font-medium">{doctor.currentWorkingPlace}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="font-medium">{doctor.experience} Years</p>
                  </div>
                </CardContent>
              </Card>

              {/* Specialties */}
              <Card>
                <CardHeader>
                  <CardTitle>Specialties</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-wrap gap-4">
                  {doctor.doctorSpecialties.map((item) => (
                    <div
                      key={item.specialties.id}
                      className="flex items-center gap-3 rounded-xl border px-4 py-3"
                    >
                      <div className="relative h-10 w-10">
                        <Image
                          src={item.specialties.icon}
                          alt={item.specialties.title}
                          fill
                          className="object-contain"
                        />
                      </div>

                      <span className="font-medium">
                        {item.specialties.title}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>


            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{doctor.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{doctor.contactNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{doctor.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
