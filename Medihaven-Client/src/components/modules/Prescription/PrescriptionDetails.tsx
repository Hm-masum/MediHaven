"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IPrescription } from "@/types";

export default function PrescriptionDetails({
  prescription,
}: {
  prescription: IPrescription;
}) {
  const { doctor, patient, instructions, followUpDate, createdAt } =
    prescription;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="rounded-3xl shadow-xl border bg-white dark:bg-black">
        <CardContent className="p-8 space-y-4 md:space-y-8">

          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {doctor.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              {doctor.qualification}
            </p>
            <p className="text-sm font-medium">{doctor.designation}</p>
            <p className="text-sm text-muted-foreground">
              {doctor.currentWorkingPlace}
            </p>
          </div>

          <Separator />

          {/* Patient Info */}
          <div className="flex flex-col md:flex-row md:justify-between gap-3 text-sm">
            <div className="space-y-1">
              <p>
                <span className="font-medium">Patient:</span>{" "}
                {patient.name}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {patient.email}
              </p>
            </div>

            <div className="md:text-right">
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <Separator />

          {/* Prescription */}
          <div>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">℞</span> Prescription
            </h2>

            <div
              className="prose prose-sm max-w-none leading-relaxed text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: instructions }}
            />
          </div>

          <Separator />

          {/* Footer */}
          <div className="flex flex-col md:flex-row md:justify-between gap-6 text-sm">
            <div>
              <p className="font-medium">Follow-up Date</p>
              <p className="text-muted-foreground">
                {followUpDate
                  ? new Date(followUpDate).toLocaleDateString()
                  : "Not scheduled"}
              </p>
            </div>

            <div className="text-center md:text-right mt-6 md:mt-0">
              <div className="h-12" />
              <p className="font-semibold">{doctor.name}</p>
              <div className="border-t w-40 mx-auto md:ml-auto mt-1" />
              <p className="text-xs text-muted-foreground">
                Doctor Signature
              </p>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}