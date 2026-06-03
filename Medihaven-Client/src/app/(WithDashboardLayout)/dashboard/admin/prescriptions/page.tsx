"use client";

import PrescriptionCard from "@/components/modules/Prescription/PrescriptionCard";
import { Input } from "@/components/ui/input";
import { getAllPrescription } from "@/service/PrescriptionService";
import { IPrescription } from "@/types";
import { useEffect, useState } from "react";

const PrescriptionInfoPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [prescriptionData, setPrescriptionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllPrescription({
        doctorEmail: searchTerm,
      });
      setPrescriptionData(res?.data || []);
    };
    fetchData();
  }, [searchTerm]);

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          placeholder="Search by Doctor Email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* prescription cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {prescriptionData?.length ? (
          prescriptionData.map((prescription: IPrescription) => (
            <PrescriptionCard
              key={prescription.id}
              prescription={prescription}
              basePath="/dashboard/admin/prescriptions"
            />
          ))
        ) : (
          <div className="col-span-full flex justify-center py-10">
            <p className="text-purple-500">No prescriptions found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionInfoPage;
