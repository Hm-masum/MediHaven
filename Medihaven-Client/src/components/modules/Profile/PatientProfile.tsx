import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, ShieldCheck, CalendarDays } from "lucide-react";
import { IPatientProfile } from "@/types";

export default function PatientProfile({ patient }: { patient: IPatientProfile }) {
  return (
    <div className="mx-auto py-2">
      <Card className="overflow-hidden border shadow-sm">
        <div className="h-36 bg-gradient-to-r from-violet-600 to-indigo-600" />

        <CardContent className="relative px-6 pb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end -mt-12 ">
            <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-4 border-white bg-white shadow">
              <Image
                src={patient.profilePhoto || "/default-profile.png"}
                alt={patient.name}
                fill
                className="object-cover"
              />
            </div>

            {/* User Info */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl md:text-3xl font-bold">{patient.name}</h1>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  {patient.status}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                <span className="font-medium">{patient.role}</span>
              </div>

              <p className="text-sm text-muted-foreground">
                Patient ID: {patient.id}
              </p>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Main Content */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>

                <CardContent className="grid gap-6 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Email Address
                      </p>
                      <p className="font-medium">{patient.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Contact Number
                      </p>
                      <p className="font-medium">{patient.contactNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Account Created
                      </p>
                      <p className="font-medium">
                        {new Date(patient.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Last Updated
                      </p>
                      <p className="font-medium">
                        {new Date(patient.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Account Status
                    </span>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      {patient.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Role</span>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{patient.role}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Deleted</span>
                    <Badge
                      variant={patient.isDeleted ? "destructive" : "outline"}
                    >
                      {patient.isDeleted ? "Yes" : "No"}
                    </Badge>
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
