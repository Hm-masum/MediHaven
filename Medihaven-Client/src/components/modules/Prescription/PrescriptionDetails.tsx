"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IPrescription } from "@/types";

export default function PrescriptionDetails({
  prescription,
}: {
  prescription: IPrescription;
}) {
  const { doctor, patient, instructions, followUpDate,createdAt } = prescription;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="rounded-2xl shadow-lg border">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">{doctor.name}</h1>
            <p className="text-sm text-muted-foreground">
              {doctor.qualification}
            </p>
            <p className="text-sm">{doctor.designation}</p>
            <p className="text-sm">{doctor.currentWorkingPlace}</p>
          </div>
          <Separator />

          {/* Patient Info */}
          <div className="flex justify-between text-sm">
            <div>
              <p>Patient:{" "}{patient.name}</p>
              <p>Email:{" "}{patient.email}</p>
            </div>
            <div>
              <p>Date:{" "}{new Date(createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <Separator />

          {/* Rx Section */}
          <div>
            <h2 className="text-xl font-semibold mb-2">℞ Prescription</h2>
            <div
              className="prose prose-sm"
              dangerouslySetInnerHTML={{ __html: instructions }}
            />
          </div>
          <Separator />

          {/* Footer */}
          <div className="flex justify-between items-end text-sm">
            <div>
              <p>Follow-up:{" "}
                {followUpDate
                  ? new Date(followUpDate).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div className="text-right mt-10 space-y-0">
              <p className="text-center font-semibold">
                {doctor.name}
              </p>
              <p className="border-t w-30 md:w-40 text-center">
                Doctor Signature
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
