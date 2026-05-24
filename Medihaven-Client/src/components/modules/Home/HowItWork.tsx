"use client";

const steps = [
  {
    number: "1",
    title: "Create Your Account",
    description:
      "Sign up as a patient in seconds. Fill in your basic health profile for personalized recommendations.",
  },
  {
    number: "2",
    title: "Find Your Doctor",
    description:
      "Search by specialty, rating, or availability. Read patient reviews and choose the best fit for your needs.",
  },
  {
    number: "3",
    title: "Book & Pay Securely",
    description:
      "Select a time slot and pay securely through our payment gateway. Instant confirmation and reminders.",
  },
  {
    number: "4",
    title: "Consult & Get Better",
    description:
      "Join your video call or in-person visit. Receive prescriptions, follow-up care, and health tracking in your dashboard.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex rounded-full border border-purple-200 bg-purple-200 px-4 py-1 text-sm font-medium text-purple-700">
            The Process
          </div>

          <h2 className="font-serif text-2xl font-bold tracking-tight md:text-5xl">
            Get Care in{" "}
            <span className="bg-linear-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
              4 Simple Steps
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-8">
          {/* Vertical Line */}
          <div className="absolute left-5.5 top-12 bottom-12 hidden w-0.5 bg-linear-to-b from-purple-500 to-pink-500 opacity-30 sm:block" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex items-start gap-5"
            >
              {/* Step Number */}
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-purple-500 to-pink-500 text-lg font-bold text-white shadow-lg">
                {step.number}
              </div>

              {/* Content Card */}
              <div className="flex-1 rounded-2xl border border-purple-100 p-6 shadow-[0_4px_20px_rgba(168,85,247,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(168,85,247,0.12)]">
                <h3 className="mb-2 text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="text-[15px] leading-7 text-[#5b4270] dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}