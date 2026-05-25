"use client";

import { getAllDoctor } from "@/service/DoctorService";
import { IDoctor } from "@/types/doctor";
import { useEffect, useState, useCallback } from "react";
import PublicDoctorCard from "./PublicDoctorCard";
import { getAllSpecialties } from "@/service/SpecialtiesService";
import { ISpecialties } from "@/types";
import { Search } from "lucide-react";

type Meta = {
  page: number;
  limit: number;
  total: number;
};

const Doctors = () => {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [, setLoading] = useState(false);
  const [allSpecialties, setAllSpecialties] = useState<ISpecialties[]>([]);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [gender, setGender] = useState("");
  const [specialties, setSpecialties] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;
  const totalPage = Math.ceil((meta?.total || 0) / limit);

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getAllDoctor(
        searchTerm || undefined,
        gender || undefined,
        specialties || undefined,
        page,
        limit,
      );
      setDoctors(result?.data?.data || []);
      setMeta(result?.data?.meta || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, gender, specialties, page, limit]);

  const fetchSpecialties = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getAllSpecialties();
      setAllSpecialties(result?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
    fetchSpecialties();
  }, [fetchDoctors, fetchSpecialties]);

  return (
    <div className="max-w-6xl py-10 px-6 mx-auto">
      {/* filtering */}
      <div className="flex flex-col gap-4 rounded-3xl border border-purple-100 p-4 shadow-sm md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-500" />
          <input
            type="text"
            placeholder="Search doctors by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 w-full rounded-2xl border border-purple-100 bg-purple-50/40 pl-11 pr-4 text-sm outline-none transition-all placeholder:text-pink-500 focus:border-purple-300 focus:ring-4 focus:ring-purple-100"
          />
        </div>

        <select
          className="h-12 rounded-2xl border border-purple-100 bg-purple-50/40 px-4 text-sm text-pink-500 outline-none transition-all focus:border-purple-300 focus:ring-4 focus:ring-purple-100"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>

        <select
          className="h-12 rounded-2xl border border-purple-100 bg-purple-50/40 px-4 text-sm text-pink-500 outline-none transition-all focus:border-purple-300 focus:ring-4 focus:ring-purple-100"
          value={specialties}
          onChange={(e) => setSpecialties(e.target.value)}
        >
          <option value="">All Specialties</option>
          {allSpecialties.map((sp) => (
            <option key={sp.id} value={sp.title}>
              {sp.title}
            </option>
          ))}
        </select>
      </div>

      {/* show data */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 my-6">
        {doctors.map((doctor: IDoctor) => (
          <PublicDoctorCard doctor={doctor} key={doctor.id} />
        ))}
      </div>

      {/* pagination */}
      <div className="flex justify-center items-center gap-2 flex-wrap">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="rounded border px-3 py-1 disabled:pointer-events-none disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPage }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`rounded border px-3 py-1 ${
              page === i + 1 ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPage}
          className="rounded border px-3 py-1 disabled:pointer-events-none disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Doctors;
