"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  const [tranId, setTranId] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);

  useEffect(() => {
    setTranId(searchParams.get("tran_id"));
    setAmount(searchParams.get("amount"));
  }, [searchParams]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/dashboard/patient/my-appointment");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Payment Successful!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Your appointment has been confirmed.
          </p>
        </div>

        {(tranId || amount) && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3 text-left">
            {tranId && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Transaction ID
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white font-mono">
                  {tranId}
                </span>
              </div>
            )}
            {amount && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Amount Paid
                </span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  ৳ {amount}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Status
              </span>
              <span className="text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-2 py-0.5 rounded-full">
                PAID
              </span>
            </div>
          </div>
        )}

        
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Redirecting to appointments in{" "}
          <span className="font-semibold text-purple-600 dark:text-purple-400">
            {countdown}s
          </span>
        </p>

  
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => router.push("/dashboard/patient/my-appointment")}
            className="w-full gap-2 bg-linear-to-r from-purple-500 to-pink-500"
          >
            <Calendar className="w-4 h-4" />
            View My Appointments
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Link href="/">
            <Button variant="outline" className="w-full">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;