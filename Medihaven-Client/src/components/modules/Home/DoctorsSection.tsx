import Link from "next/link";
import {
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";;
import { IDoctor } from "@/types/doctor";
import PublicDoctorCard from "../Doctor/PublicDoctorCard";
import { getAllDoctor } from "@/service/DoctorService";

const DoctorsSection = async() => {
   const {data:doctors} = await getAllDoctor()
  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-purple-200 bg-purple-100 px-4 py-1 text-sm font-medium text-purple-700">
              Our Doctors
            </div>

            <h2 className="font-serif text-2xl font-bold tracking-tight md:text-5xl">
              Meet Our{" "}
              <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Top Specialists
              </span>
            </h2>
          </div>

          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-violet-200 px-6 text-purple-700 hover:bg-purple-50"
          >
            <Link href="/doctors">
              View All Doctors
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Doctors Grid */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {doctors?.data.slice(0, 8).map((doctor:IDoctor) => (
            <PublicDoctorCard key={doctor.id} doctor={doctor}/>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DoctorsSection