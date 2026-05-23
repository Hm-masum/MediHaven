"use client";

import SectionTitle from "@/components/shared/SectionTitle";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createSchedule } from "@/service/ScheduleService";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateScheduleForm = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const scheduleData = {
        ...data,
      };

      const res = await createSchedule(scheduleData);
      if (res.success) {
        toast.success("Schedule Create Successfully");
        router.push("/dashboard/admin/schedules");
      }
      else{
        toast.error(res.message || "Failed to create schedule");
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="border border-gray-300 rounded-xl grow w-full p-5 md:p-10 bg-white dark:bg-black min-h-[calc(100vh-64px)]">
      <SectionTitle
        title="Create"
        colorWord="Schedule"
        subtitle="Create a new schedule.Help patients find the right expert faster."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-3 w-full bg-linear-to-r from-purple-500 to-pink-500 py-3">
            {isSubmitting ? "Creating...." : "Create Schedule"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateScheduleForm;
