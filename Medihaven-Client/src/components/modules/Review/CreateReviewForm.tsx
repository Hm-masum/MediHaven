"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { IReview } from "@/types";
import { createReview } from "@/service/ReviewService";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

export default function CreateReviewForm({
  appointmentId,
}: {
  appointmentId: string;
}) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  const { register, handleSubmit } = useForm<IReview>({
    defaultValues: {
      appointmentId,
      rating: 0,
      comment: "",
    },
  });

  const onSubmit = async (data: IReview) => {
    try {
      const payload = {
        appointmentId: appointmentId,
        rating: rating,
        comment: data.comment,
      };
      const result = await createReview(payload);
      if (result?.success) {
        toast.success(result?.message);
      } else {
        toast.error(result?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-xl space-y-6">
      <h2 className="text-2xl font-bold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Create Review
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Share your experience with this doctor.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Appointment ID</label>
          <Input {...register("appointmentId")} readOnly />
        </div>

        <div>
          <Label className="mb-3 block">Rating</Label>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
              >
                <Star
                  className={`h-8 w-8 transition ${
                    star <= (hovered || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="comment" className="mb-3 block">
            Comment
          </Label>
          <Textarea
            id="comment"
            placeholder="Write your experience..."
            {...register("comment")}
            rows={5}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-linear-to-r from-purple-500 to-pink-500"
        >
          Create Review
        </Button>
      </form>
    </div>
  );
}
