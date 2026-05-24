"use client";

import {
  CalendarDays,
  Video,
  FileText,
  ShieldCheck,
  Clock3,
  CreditCard,
} from "lucide-react";

const features = [
  {
    title: "Instant Booking",
    description:
      "Book appointments with verified doctors in under 60 seconds. Real-time schedule availability, zero waiting.",
    icon: CalendarDays,
    iconColor: "text-violet-500",
  },
  {
    title: "Video Consultations",
    description:
      "HD video calls with your doctor from the comfort of home. Secure, private, and just as effective as in-person.",
    icon: Video,
    iconColor: "text-pink-500",
  },
  {
    title: "Digital Prescriptions",
    description:
      "Receive prescriptions digitally, track medications, and set reminders — all in your patient dashboard.",
    icon: FileText,
    iconColor: "text-violet-600",
  },
  {
    title: "Health Records",
    description:
      "Store medical reports, lab results, and health history securely. Access anytime, share with any doctor.",
    icon: ShieldCheck,
    iconColor: "text-pink-600",
  },
  {
    title: "24/7 Availability",
    description:
      "Health emergencies don't keep office hours. Our on-call doctors are available around the clock, every day.",
    icon: Clock3,
    iconColor: "text-violet-500",
  },
  {
    title: "Secure Payments",
    description:
      "Pay safely for consultations with multiple gateway options. Transparent pricing with no hidden fees.",
    icon: CreditCard,
    iconColor: "text-pink-500",
  },
];

export default function WhyMediHaven() {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex rounded-full border border-violet-200 bg-violet-100 px-4 py-1 text-sm font-medium text-purple-700">
            Why MediHaven?
          </div>

          <h2 className="font-serif text-2xl font-bold tracking-tight md:text-5xl">
            Healthcare Made{" "}
            <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Simple & Smart
            </span>
          </h2>
        </div>


        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-purple-100 bg-white dark:bg-black p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)]"
              >
                {/* Bottom Gradient Border */}
                <div className="absolute bottom-0 left-0 h-0.75 w-full origin-left scale-x-0 bg-linear-to-r from-purple-500 to-pink-500 transition-transform duration-500 group-hover:scale-x-100" />

                {/* Icon */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-300 dark:to-pink-100">
                  <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="text-[15px] leading-7 text-[#5b4270] dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}