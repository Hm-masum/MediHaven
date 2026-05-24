"use client";

import { Eye, Target } from "lucide-react";

export default function MissionVisionSection() {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        {/* Mission */}
        <div className="rounded-[32px] border border-purple-100 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-200/5 dark:to-pink-200/5 p-10">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-r from-purple-500 to-pink-500">
            <Target className="h-8 w-8 text-white" />
          </div>

          <h2 className="mb-4 font-serif text-3xl font-bold ">
            Our Mission
          </h2>

          <p className="text-[17px] leading-8 text-[#5b4270] dark:text-[#a68dbb]">
            Our mission is to make healthcare accessible, affordable, and
            seamless for everyone by combining trusted medical professionals
            with modern technology.
          </p>
        </div>

        {/* Vision */}
        <div className="rounded-[32px] border border-purple-100 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-200/5 dark:to-pink-200/5 p-10">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-r from-pink-500 to-violet-500">
            <Eye className="h-8 w-8 text-white" />
          </div>

          <h2 className="mb-4 font-serif text-3xl font-bold">
            Our Vision
          </h2>

          <p className="text-[17px] leading-8 text-[#5b4270] dark:text-[#a68dbb]">
            We envision a future where quality healthcare is only a few clicks
            away, empowering patients and doctors through digital innovation and
            human-centered care.
          </p>
        </div>
      </div>
    </section>
  );
}