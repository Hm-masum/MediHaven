"use client";

import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#faf7ff] dark:bg-transparent px-6 py-10">
      {/* Background Blur */}
      <div className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex rounded-full border border-purple-200 bg-purple-200 px-4 py-1 text-sm font-medium text-purple-700">
            Contact Us
          </div>

          <h1 className="mb-6 font-serif text-4xl font-bold md:text-6xl">
            We’re Here To{" "}
            <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Help You
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-8 text-[#5b4270] dark:text-gray-400">
            Have questions, feedback, or need support? Reach out to the
            MediHaven team anytime — we’d love to hear from you.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-2 md:gap-6 md:grid-cols-3">
          {/* Phone */}
          <div className="rounded-3xl border border-purple-100 bg-white dark:bg-transparent p-8 text-center shadow-[0_4px_20px_rgba(168,85,247,0.08)]">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r from-violet-500 to-pink-500">
              <Phone className="h-6 w-6 text-white" />
            </div>

            <h3 className="mb-2 text-xl font-semibold">
              Call Us
            </h3>

            <p className="text-[#5b4270] dark:text-gray-400">+880 1817267861</p>
          </div>

          {/* Email */}
          <div className="rounded-3xl border border-purple-100 bg-white dark:bg-transparent p-8 text-center shadow-[0_4px_20px_rgba(168,85,247,0.08)]">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r from-pink-500 to-orange-400">
              <Mail className="h-6 w-6 text-white" />
            </div>

            <h3 className="mb-2 text-xl font-semibold">
              Email Us
            </h3>

            <p className="text-[#5b4270] dark:text-gray-400">support@medihaven.com</p>
          </div>

          {/* Location */}
          <div className="rounded-3xl border border-purple-100 bg-white dark:bg-transparent p-8 text-center shadow-[0_4px_20px_rgba(168,85,247,0.08)]">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r from-indigo-500 to-violet-500">
              <MapPin className="h-6 w-6 text-white" />
            </div>

            <h3 className="mb-2 text-xl font-semibold">
              Visit Us
            </h3>

            <p className="text-[#5b4270] dark:text-gray-400">Chattogram, Bangladesh</p>
          </div>
        </div>
      </div>
    </section>
  );
}