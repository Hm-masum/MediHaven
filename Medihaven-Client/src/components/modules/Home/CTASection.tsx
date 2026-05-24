"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[32px] bg-linear-to-br from-purple-500 to-pink-500 px-6 py-16 text-center md:px-12">
          {/* Decorative Circles */}
          <div className="absolute -right-16 -top-16 h-50 w-50 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -left-10 h-37.5 w-37.5 rounded-full bg-white/10" />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="mx-auto mb-3 max-w-3xl font-serif text-2xl font-bold leading-tight text-white md:text-5xl">
              Start Your Health Journey Today
            </h2>

            <p className="mx-auto mb-5 max-w-2xl text-[17px] leading-6 text-white/85">
              Join thousands of patients who've taken control of their health
              with MediHaven. Your first consultation is just a click away.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                className="h-12 rounded-full bg-white px-8 text-sm font-bold text-violet-600 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl"
              >
                <Link href="/register">
                  Create Free Account
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full border-2 border-white/40 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-white"
              >
                <Link href="/doctors">Browse Doctors</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}