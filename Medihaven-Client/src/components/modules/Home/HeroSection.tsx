"use client";

import Link from "next/link";
import {
  ArrowRight,
  CircleCheckBig,
  Stethoscope,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6">
      {/* Background Blobs */}
      <div className="pointer-events-none absolute -right-50 -top-25 h-150 w-150 rounded-full bg-purple-500/15 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-25 -left-25 h-10 w-10 rounded-full bg-pink-500/15 blur-3xl" />

      <div className="pointer-events-none absolute left-[40%] top-[40%] h-75 w-75 rounded-full bg-purple-700/10 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-20 md:gap-16 py-14 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <h5 className="mb-6 flex items-center rounded-full border border-purple-200 bg-purple-200 px-4 py-1 text-sm font-medium text-purple-700 w-fit justify-center mx-auto md:mx-0">
             Trusted Healthcare Platform
          </h5>

          {/* Heading */}
          <h1 className="mb-6 font-serif text-3xl font-bold leading-tight tracking-tight md:text-6xl text-center md:text-start">
            Your Health, {" "}
            <br className="hidden md:block"/>
            <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Our Priority
            </span>
          </h1>

          {/* Description */}
          <p className="mb-6 max-w-xl text-lg leading-8 text-[#5b4270] dark:text-gray-300 text-center md:text-start">
            Connect with top-rated doctors, book appointments instantly, get
            prescriptions online, and manage your complete health journey — all
            in one place.
          </p>

          {/* Buttons */}
          <div className="mb-12 flex flex-col md:flex-row justify-center md:justify-start items-center gap-4">
            <Button
              asChild
              className="h-12 rounded-full bg-linear-to-r from-purple-500 to-pink-500 px-7 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:opacity-90"
            >
              <Link href="/register">
                Book an Appointment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-purple-200 px-7 text-sm font-semibold text-purple-700 hover:bg-purple-50"
            >
              <Link href="/doctors">Meet Our Doctors</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-2 md:gap-6">
            <div>
              <div className="bg-linear-to-r from-violet-500 to-pink-500 bg-clip-text font-serif text-3xl font-bold text-transparent">
                10K+
              </div>

              <div className="text-sm font-medium text-[#7c5fa0]">
                Happy Patients
              </div>
            </div>

            <div className="h-12 w-px bg-violet-200" />

            <div>
              <div className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text font-serif text-3xl font-bold text-transparent">
                500+
              </div>
              <div className="text-sm font-medium text-[#7c5fa0]">
                Expert Doctors
              </div>
            </div>

            <div className="h-12 w-px bg-violet-200" />

            <div>
              <div className="bg-linear-to-r from-violet-500 to-pink-500 bg-clip-text font-serif text-3xl font-bold text-transparent">
                4.9★
              </div>

              <div className="text-sm font-medium text-[#7c5fa0]">
                Average Rating
              </div>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative flex items-center justify-center">
          {/* Rings */}
          <div className="absolute h-56 w-56 md:h-85 md:w-85 rounded-full border-2 border-dashed border-purple-200" />

          <div className="absolute h-64 w-64 md:h-100 md:w-100 rounded-full border border-pink-200/50" />

          {/* Main Circle */}
          <div className="relative z-10 animate-[float_4s_ease-in-out_infinite]">
            <div className="flex h-48 w-48 md:h-70 md:w-70 items-center justify-center overflow-hidden rounded-full border-4 border-purple-200 bg-linear-to-br from-purple-100 to-pink-100">
              {/* Doctor Illustration */}
              <svg
                width="160"
                height="220"
                viewBox="0 0 160 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Coat */}
                <rect
                  x="30"
                  y="110"
                  width="100"
                  height="100"
                  rx="8"
                  fill="white"
                  opacity="0.9"
                />
                <rect
                  x="30"
                  y="110"
                  width="40"
                  height="100"
                  fill="url(#doctorGrad)"
                  opacity="0.15"
                />
                <rect
                  x="90"
                  y="110"
                  width="40"
                  height="100"
                  fill="url(#doctorGrad)"
                  opacity="0.15"
                />
                {/* Collar */}
                <path
                  d="M65 110 L80 130 L95 110"
                  stroke="url(#doctorGrad)"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Stethoscope */}
                <circle
                  cx="80"
                  cy="150"
                  r="10"
                  stroke="#ec4899"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M70 150 Q60 160 60 170 Q60 180 70 180 Q80 180 80 170"
                  stroke="#ec4899"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Head */}
                <ellipse
                  cx="80"
                  cy="72"
                  rx="30"
                  ry="36"
                  fill="#f8d5c0"
                />
                {/* Hair */}
                <path
                  d="M50 72 Q50 40 80 38 Q110 40 110 72"
                  fill="#4b2b7c"
                />
                {/* Eyes */}
                <circle
                  cx="70"
                  cy="68"
                  r="3"
                  fill="#4b2b7c"
                />
                <circle
                  cx="90"
                  cy="68"
                  r="3"
                  fill="#4b2b7c"
                />
                {/* Smile */}
                <path
                  d="M72 82 Q80 88 88 82"
                  stroke="#ec4899"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Neck */}
                <rect
                  x="70"
                  y="105"
                  width="20"
                  height="12"
                  rx="4"
                  fill="#f8d5c0"
                />

                {/* Gradient */}
                <defs>
                  <linearGradient
                    id="doctorGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="#a855f7"
                    />
                    <stop
                      offset="100%"
                      stopColor="#ec4899"
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Floating Card 1 */}
          <div className="absolute right-0 md:-right-10 -top-12 md:top-6 rounded-2xl border border-linear-100 bg-white p-4 shadow-[0_8px_32px_rgba(168,85,247,0.15)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-r from-purple-500 to-pink-500">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>

              <div>
                <div className="text-xs text-gray-400">
                  Live Consultation
                </div>
                <div className="text-sm font-semibold text-[#1a0e2e]">
                  120+ Doctors Online
                </div>
              </div>
            </div>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute -bottom-12 md:bottom-6 left-0 md:-left-10 rounded-2xl border border-violet-100 bg-white p-4 shadow-[0_8px_32px_rgba(168,85,247,0.15)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-pink-200 to-pink-300">
                <CircleCheckBig className="h-5 w-5 text-violet-700" />
              </div>

              <div>
                <div className="text-xs text-gray-400">
                  Appointments
                </div>

                <div className="text-sm font-semibold text-[#1a0e2e]">
                  98% Success Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </section>
  );
}