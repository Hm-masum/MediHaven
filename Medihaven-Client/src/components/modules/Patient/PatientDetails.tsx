import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  HeartPulse,
  Activity,
  FileText,
} from "lucide-react";
import { IPatient } from "@/types";

export default function PatientDetails({ patient }: { patient: IPatient }) {
  const health = patient.patientHealthData;

  return (
    <div className="cmx-auto py-2">
      <Card className="overflow-hidden border shadow-sm">
        <div className="h-36 bg-linear-to-r from-purple-500 to-pink-500" />

        <CardContent className="relative px-6 pb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end -mt-12">
            {/* Image */}
            <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-4 border-white bg-white shadow">
              <Image
                src={patient.profilePhoto || "/default-profile.png"}
                alt={patient.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl md:text-3xl font-bold">{patient.name}</h1>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  Blood: {health?.bloodGroup || "N/A"}
                </Badge>

                <Badge variant="outline">{health?.gender || "N/A"}</Badge>

                <Badge variant="outline">
                  {health?.maritalStatus || "N/A"}
                </Badge>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

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
                      <p className="text-sm text-muted-foreground">Email</p>
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
                    <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{patient.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Date of Birth
                      </p>
                      <p className="font-medium">
                        {health?.dateOfBirth || "N/A"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Health Information</CardTitle>
                </CardHeader>

                <CardContent className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Height</p>
                    <p className="font-medium">{health?.height || "N/A"} ft</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="font-medium">{health?.weight || "N/A"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Allergies</p>
                    <Badge
                      variant={
                        health?.hasAllergies ? "destructive" : "secondary"
                      }
                    >
                      {health?.hasAllergies ? "Yes" : "No"}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Diabetes</p>
                    <Badge
                      variant={
                        health?.hasDiabetes ? "destructive" : "secondary"
                      }
                    >
                      {health?.hasDiabetes ? "Yes" : "No"}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Smoking Status
                    </p>
                    <Badge
                      variant={
                        health?.smokingStatus ? "destructive" : "secondary"
                      }
                    >
                      {health?.smokingStatus ? "Smoker" : "Non-Smoker"}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Past Surgeries
                    </p>
                    <Badge
                      variant={
                        health?.hasPastSurgeries ? "destructive" : "secondary"
                      }
                    >
                      {health?.hasPastSurgeries ? "Yes" : "No"}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Anxiety</p>
                    <Badge
                      variant={
                        health?.recentAnxiety ? "destructive" : "secondary"
                      }
                    >
                      {health?.recentAnxiety ? "Recent" : "No"}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Depression</p>
                    <Badge
                      variant={
                        health?.recentDepression ? "destructive" : "secondary"
                      }
                    >
                      {health?.recentDepression ? "Recent" : "No"}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Dietary Preferences
                    </p>
                    <p className="font-medium">
                      {health?.dietaryPreferences || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Immunization Status
                    </p>
                    <p className="font-medium">
                      {health?.immunizationStatus || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Pregnancy Status
                    </p>
                    <Badge
                      variant={
                        health?.pregnancyStatus ? "destructive" : "secondary"
                      }
                    >
                      {health?.pregnancyStatus ? "Pregnant" : "No"}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Mental Health History
                    </p>

                    <p className="font-medium">
                      {health?.mentalHealthHistory || "N/A"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Medical Reports */}
              <Card>
                <CardHeader>
                  <CardTitle>Medical Reports</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {patient?.medicalReport?.map((report) => (
                    <div
                      key={report?.id}
                      className="flex items-center justify-between rounded-xl border p-4"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{report?.reportName}</p>
                          <p className="text-sm text-muted-foreground">
                            Uploaded on{" "}
                            {new Date(report?.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <Button
                        asChild
                        size="sm"
                        className="bg-linear-to-r from-purple-500 to-pink-500"
                      >
                        <Link href={report?.reportLink} target="_blank">
                          View
                        </Link>
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Health Summary</CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div className="flex items-center gap-3">
                    <HeartPulse className="h-5 w-5 text-rose-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Blood Group
                      </p>
                      <p className="font-semibold">
                        {health?.bloodGroup || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        BMI Status
                      </p>
                      <p className="font-semibold">Healthy</p>
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
