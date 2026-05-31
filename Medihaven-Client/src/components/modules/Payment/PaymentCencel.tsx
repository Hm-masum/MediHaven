"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Ban, ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentCancel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tran_id");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
            <Ban className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Payment Cancelled
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            You cancelled the payment. Your appointment is still pending.
          </p>
        </div>

        {tranId && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-left">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Transaction ID
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white font-mono">
                {tranId}
              </span>
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Status
              </span>
              <span className="text-xs font-medium text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/40 px-2 py-0.5 rounded-full">
                CANCELLED
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => router.push("/dashboard/patient/my-appointment")}
            className="w-full gap-2 bg-linear-to-r from-purple-500 to-pink-500"
          >
            <Calendar className="w-4 h-4" />
            Go to Appointments
          </Button>

          <Link href="/">
            <Button variant="outline" className="w-full gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;