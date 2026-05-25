"use client";

import Link from "next/link";
import { ArrowRight, HeartPulse, ShieldCheck, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#faf7ff] dark:bg-transparent px-6 py-14">
      {/* Background Blur */}
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <h5 className="mb-5 flex justify-center w-fit mx-auto md:mx-0 rounded-full border border-purple-200 bg-purple-200 px-4 py-1 text-sm font-medium text-purple-700">
            About MediHaven
          </h5>

          <h1 className="mb-6 font-serif text-3xl font-bold leading-tight md:text-6xl text-center md:text-start">
            Healthcare Built Around{" "}
            <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Real People
            </span>
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-8 text-[#5b4270] dark:text-gray-400 text-center md:text-start">
            MediHaven connects patients with trusted doctors through a modern,
            secure, and easy-to-use healthcare platform designed for everyone.
          </p>

          <div className="flex gap-4 items-center justify-center md:justify-start">
            <Button
              asChild
              className="h-12 rounded-full bg-linear-to-r from-violet-500 to-pink-500 px-7 text-white hover:opacity-90"
            >
              <Link href="/doctors">
                Find Doctors
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-purple-400 px-7 text-purple-700 hover:bg-purple-100 dark:border-pink-400 dark:text-pink-500 "
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        {/* Right Cards */}
        <div className="grid gap-2 md:gap-5 sm:grid-cols-2">
          <div className="rounded-3xl border border-violet-100 bg-white dark:bg-transparent p-7 shadow-[0_4px_20px_rgba(168,85,247,0.08)]">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r from-violet-500 to-pink-500">
              <HeartPulse className="h-7 w-7 text-white" />
            </div>

            <h3 className="mb-2 text-xl font-semibold">
              Patient First
            </h3>

            <p className="leading-7 text-[#5b4270] dark:text-gray-400">
              We prioritize accessible and quality healthcare experiences for
              every patient.
            </p>
          </div>

          <div className="rounded-3xl border border-violet-100 bg-white dark:bg-transparent p-7 shadow-[0_4px_20px_rgba(168,85,247,0.08)] sm:mt-10">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r from-pink-500 to-orange-400">
              <ShieldCheck className="h-7 w-7 text-white" />
            </div>

            <h3 className="mb-2 text-xl font-semibold">
              Secure Platform
            </h3>

            <p className="leading-7 text-[#5b4270] dark:text-gray-400">
              Your appointments, prescriptions, and medical records stay fully
              protected.
            </p>
          </div>

          <div className="rounded-3xl border border-violet-100 bg-white dark:bg-transparent p-7 shadow-[0_4px_20px_rgba(168,85,247,0.08)] sm:col-span-2">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r from-indigo-500 to-purple-500">
              <Users className="h-7 w-7 text-white" />
            </div>

            <h3 className="mb-2 text-xl font-semibold">
              Trusted by Thousands
            </h3>

            <p className="max-w-2xl leading-7 text-[#5b4270] dark:text-gray-400">
              Thousands of patients and doctors trust MediHaven every day for
              consultations, bookings, prescriptions, and healthcare management.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}