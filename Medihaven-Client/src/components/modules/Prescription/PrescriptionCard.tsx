"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IPrescription } from "@/types";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function PrescriptionCard({
  prescription,basePath
}: {
  prescription: IPrescription,
  basePath: string
}) {
  const { doctor, patient, followUpDate, appointment, createdAt } =
    prescription;

  return (
    <Card className="rounded-xl shadow-sm border bg-white">
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">Rx Summary</h3>
            <p className="text-xs text-gray-500">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>

          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
            {appointment.status}
          </span>
        </div>

        {/* Patient / Doctor Box */}
        <div className="bg-gray-100 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-1">PATIENT / DOCTOR</p>
          <p className=" text-gray-800">{patient.name}</p>
          <p className=" text-gray-600">{doctor.name}</p>
        </div>

        {/* Note */}
        <p className="text-sm text-gray-500 italic">
          "Continue prescribed medication. Follow-up in{" "}
          {new Date(followUpDate || "").toLocaleDateString()}"
        </p>

        {/* Button */}
        <Link href={`${basePath}/${prescription.id}`}>
          <Button
            variant="outline"
            className="w-fit rounded-full flex items-center gap-2"
          >
            <Eye size={16} />
            View Full Prescription
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
