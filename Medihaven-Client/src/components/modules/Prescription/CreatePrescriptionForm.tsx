"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IPrescription } from "@/types";
import { toast } from "sonner";
import { createPrescription } from "@/service/PrescriptionService";

export default function CreatePrescriptionForm({
  appointmentId,
}: {
  appointmentId: string;
}) {
  const { register, handleSubmit, reset } = useForm<IPrescription>({
    defaultValues: {
      appointmentId,
    },
  });

  const onSubmit = async (data: IPrescription) => {
    try {
      const payload = {
        appointmentId: data.appointmentId,
        instructions: data.instructions,
        followUpDate: data.followUpDate ? new Date(data.followUpDate) : null,
      };

      const result = await createPrescription(payload);
      if (result?.success) {
        toast.success(result?.message);
      }
      else{
        toast.error(result?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }

    reset();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-xl space-y-6">
      <h2 className="text-2xl font-bold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Create Prescription</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Appointment ID</label>
          <Input {...register("appointmentId")} readOnly />
        </div>

        <div>
          <label className="text-sm font-medium">Instructions</label>

          <textarea
            {...register("instructions", {
              required: true,
            })}
            rows={8}
            placeholder="<p>Napa Extra</p> <p>1+1+1</p>"
            className="w-full border rounded-md p-3"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Follow Up Date</label>

          <Input
            type="date"
            {...register("followUpDate", {
              required: true,
            })}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-linear-to-r from-purple-500 to-pink-500"
        >
          Create Prescription
        </Button>
      </form>
    </div>
  );
}
