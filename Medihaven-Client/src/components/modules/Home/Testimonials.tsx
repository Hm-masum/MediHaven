"use client";

import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Rashida Akter",
    location: "Dhaka, Bangladesh",
    initials: "RA",
    quoteColor: "text-violet-500",
    avatarGradient: "from-violet-500 to-pink-500",
    review:
      "MediHaven completely changed how I manage my family's health. Booking a specialist used to take weeks — now I do it in minutes. The video call quality is excellent too!",
  },
  {
    name: "Mohammad Islam",
    location: "Chittagong, Bangladesh",
    initials: "MI",
    quoteColor: "text-pink-500",
    avatarGradient: "from-indigo-500 to-violet-500",
    review:
      "As someone with a chronic condition, having all my health records in one place and easy access to my specialist is invaluable. The prescription tracking feature is a lifesaver.",
  },
  {
    name: "Sharmin Khatun",
    location: "Sylhet, Bangladesh",
    initials: "SK",
    quoteColor: "text-violet-700",
    avatarGradient: "from-pink-500 to-orange-500",
    review:
      "The doctors on MediHaven are incredibly thorough. I got a pediatrician consultation at midnight when my baby had a fever. That peace of mind is priceless.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex rounded-full border border-purple-200 bg-purple-200 px-4 py-1 text-sm font-medium text-purple-700">
            Patient Stories
          </div>

          <h2 className="font-serif text-2xl font-bold tracking-tight text-[#1a0e2e] md:text-5xl">
            What Our Patients{" "}
            <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid gap-3 md:gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-3xl border border-purple-100 p-6 md:p-8 shadow-[0_4px_20px_rgba(168,85,247,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)]"
            >
              {/* Quote Icon */}
              <Quote
                className={`mb-5 h-10 w-10 ${testimonial.quoteColor}`}
              />

              {/* Review */}
              <p className="mb-4 text-[15px] leading-8 text-[#4b2b7c] dark:text-gray-300">
                {testimonial.review}
              </p>

              {/* Footer */}
              <div className="flex items-center gap-3 border-t border-purple-100 pt-4">
                {/* Avatar */}
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-r ${testimonial.avatarGradient} text-sm font-bold text-white`}
                >
                  {testimonial.initials}
                </div>

                {/* User Info */}
                <div>
                  <h4 className="text-sm font-semibold">
                    {testimonial.name}
                  </h4>

                  <p className="text-xs text-[#7c5fa0] dark:text-gray-300">
                    {testimonial.location}
                  </p>
                </div>

                {/* Rating */}
                <div className="ml-auto flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}