"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentFail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tran_id");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Payment Failed!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Something went wrong with your payment. Please try again.
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
              <span className="text-xs font-medium text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/40 px-2 py-0.5 rounded-full">
                FAILED
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => router.push("/dashboard/patient/my-appointment")}
            className="w-full gap-2 bg-linear-to-r from-purple-500 to-pink-500"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
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

export default PaymentFail;