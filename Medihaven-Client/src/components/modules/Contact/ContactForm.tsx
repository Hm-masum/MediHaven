"use client";

import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactFormSection() {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <div className="mb-4 flex w-fit justify-center mx-auto md:mx-0 rounded-full border border-purple-200 bg-purple-200 px-4 py-1 text-sm font-medium text-purple-700">
            Get In Touch
          </div>

          <h2 className="mb-5 font-serif text-2xl md:text-4xl font-bold text-center md:text-start">
            Send Us a <span className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Message</span>
          </h2>

          <p className="max-w-lg text-lg leading-8 text-[#5b4270] dark:text-gray-400 text-center md:text-start">
            Whether you need technical support, appointment help, or general
            information, our team is ready to assist you.
          </p>

          {/* Info Box */}
          <div className="mt-10 rounded-3xl border border-purple-100 bg-[#faf7ff] dark:bg-transparent p-6 text-center md:text-start">
            <h4 className="mb-2 text-lg font-semibold ">
              Support Hours
            </h4>

            <p className="leading-7 text-[#5b4270] dark:text-gray-400">
              Saturday - Thursday
              <br />
              9:00 AM - 10:00 PM
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-[32px] border border-purple-200 bg-white dark:bg-transparent p-8 shadow-[0_4px_30px_rgba(168,85,247,0.08)]">
          <form className="space-y-2 md:space-y-4">
            <div className="grid gap-2 md:gap-4 md:grid-cols-2">
              <Input
                placeholder="Your Name"
                className="h-12 rounded-xl border-purple-100 focus-visible:ring-purple-500"
              />

              <Input
                type="email"
                placeholder="Email Address"
                className="h-12 rounded-xl border-purple-100 focus-visible:ring-purple-500"
              />
            </div>

            <Input
              placeholder="Subject"
              className="h-12 rounded-xl border-purple-100 focus-visible:ring-purple-500"
            />

            <Textarea
              placeholder="Write your message..."
              className="min-h-32 rounded-2xl border-purple-100 focus-visible:ring-purple-500"
            />

            <Button className="h-12 w-full rounded-full bg-linear-to-r from-purple-500 to-pink-500 text-white hover:opacity-90">
              Send Message
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}