"use client";

import Link from "next/link";
import { ArrowRight, HeartPulse, ShieldCheck, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#faf7ff] px-6 py-24">
      {/* Background Blur */}
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />

      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <div className="mb-5 inline-flex rounded-full border border-violet-200 bg-violet-100 px-4 py-1 text-sm font-medium text-violet-700">
            About MediHaven
          </div>

          <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-[#1a0e2e] md:text-6xl">
            Healthcare Built Around{" "}
            <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
              Real People
            </span>
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-8 text-[#5b4270]">
            MediHaven connects patients with trusted doctors through a modern,
            secure, and easy-to-use healthcare platform designed for everyone.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="h-12 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-7 text-white hover:opacity-90"
            >
              <Link href="/doctors">
                Find Doctors
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-violet-200 px-7 text-violet-700 hover:bg-violet-50"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        {/* Right Cards */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl border border-violet-100 bg-white p-7 shadow-[0_4px_20px_rgba(168,85,247,0.08)]">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500">
              <HeartPulse className="h-7 w-7 text-white" />
            </div>

            <h3 className="mb-2 text-xl font-semibold text-[#1a0e2e]">
              Patient First
            </h3>

            <p className="leading-7 text-[#5b4270]">
              We prioritize accessible and quality healthcare experiences for
              every patient.
            </p>
          </div>

          <div className="rounded-3xl border border-violet-100 bg-white p-7 shadow-[0_4px_20px_rgba(168,85,247,0.08)] sm:mt-10">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-orange-400">
              <ShieldCheck className="h-7 w-7 text-white" />
            </div>

            <h3 className="mb-2 text-xl font-semibold text-[#1a0e2e]">
              Secure Platform
            </h3>

            <p className="leading-7 text-[#5b4270]">
              Your appointments, prescriptions, and medical records stay fully
              protected.
            </p>
          </div>

          <div className="rounded-3xl border border-violet-100 bg-white p-7 shadow-[0_4px_20px_rgba(168,85,247,0.08)] sm:col-span-2">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500">
              <Users className="h-7 w-7 text-white" />
            </div>

            <h3 className="mb-2 text-xl font-semibold text-[#1a0e2e]">
              Trusted by Thousands
            </h3>

            <p className="max-w-2xl leading-7 text-[#5b4270]">
              Thousands of patients and doctors trust MediHaven every day for
              consultations, bookings, prescriptions, and healthcare management.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}