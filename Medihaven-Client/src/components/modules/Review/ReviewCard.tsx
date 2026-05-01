"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { IReview } from "@/types";
import { Star, CalendarDays, UserRound } from "lucide-react";

export default function ReviewCard({ reviewInfo }: { reviewInfo: IReview }) {
  return (
      <Card className="rounded-2xl shadow-md border bg-white">
        <CardContent className="p-5 space-y-4">
          {/* Top Section */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <Avatar className="h-10 w-10">
                <AvatarImage
                  className="rounded-full"
                  src={
                    reviewInfo?.patient?.profilePhoto ||
                    "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>

              {/* Name + Date */}
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-900">
                  {reviewInfo?.patient?.name || "Anonymous"}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  <span>
                    {" "}
                    {
                      new Date(reviewInfo.createdAt).toISOString().split("T")[0]
                    }{" "}
                  </span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {reviewInfo?.rating ? (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < reviewInfo.rating ? "fill-current" : "stroke-current"}`}
                      />
                    ))}
                  </>
                ) : (
                  <Star className="h-4 w-4 text-amber-400 stroke-current" />
                )}
              </div>

              <span className="text-sm text-slate-700 font-medium">
                {reviewInfo?.rating || 0}/5
              </span>
            </div>
          </div>

          {/* Review Text */}
          <p className="text-sm italic text-slate-600 leading-relaxed">
            "{reviewInfo?.comment}"
          </p>

          {/* Divider */}
          <div className="border-t" />

          {/* Doctor Name */}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <UserRound className="h-4 w-4 text-emerald-600" />
            <span>{reviewInfo?.doctor?.name}</span>
          </div>
        </CardContent>
      </Card>
  );
}
