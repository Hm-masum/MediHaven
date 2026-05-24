"use client";

import {
  HeartPulse,
  Brain,
  ShieldPlus,
  Baby,
  Bone,
  Sparkles,
  Eye,
  Stethoscope,
  Activity,
  Pill,
} from "lucide-react";

const specialties = [
  {
    title: "Cardiology",
    icon: HeartPulse,
    active: true,
  },
  {
    title: "Neurology",
    icon: Brain,
  },
  {
    title: "Oncology",
    icon: ShieldPlus,
  },
  {
    title: "Pediatrics",
    icon: Baby,
  },
  {
    title: "Orthopedics",
    icon: Bone,
  },
  {
    title: "Dermatology",
    icon: Sparkles,
  },
  {
    title: "Ophthalmology",
    icon: Eye,
  },
  {
    title: "Gynecology",
    icon: Stethoscope,
  },
  {
    title: "Psychiatry",
    icon: Pill,
  },
  {
    title: "Medicine",
    icon: Activity,
  },
];

export default function SpecialtiesSection() {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-purple-200 bg-purple-200 px-4 py-1 text-sm font-medium text-purple-700">
            Specialties
          </div>

          <h2 className="mb-5 font-serif text-2xl font-bold tracking-tight md:text-5xl">
            Comprehensive Care,{" "}
            <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Every Specialty
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-[17px] leading-8 text-[#5b4270] dark:text-gray-300">
            From routine check-ups to specialized treatments — our network
            covers all your healthcare needs.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {specialties.map((specialty, index) => {
            const Icon = specialty.icon;
            return (
              <button
                key={index}
                className={`group inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  specialty.active
                    ? "border-transparent bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "border-purple-200 text-purple-600 hover:border-transparent hover:bg-linear-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />

                <span>{specialty.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}