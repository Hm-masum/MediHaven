"use client";

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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";
import { updateSpecialties } from "@/service/SpecialtiesService";
import SectionTitle from "@/components/shared/SectionTitle";
import { ISpecialties } from "@/types";
import { useRouter } from "next/navigation";

const UpdateSpecialtiesForm = ({
  specialtiesData,
}: {
  specialtiesData: ISpecialties;
}) => {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const form = useForm({
    defaultValues: {
      title: specialtiesData.title,
      image: specialtiesData.icon,
    },
  });

  const {
    register,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const updatedData = {
        ...data,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(updatedData));
      if (data.image && data.image.length > 0) {
        formData.append("file", data.image[0]);
      }

      const res = await updateSpecialties(specialtiesData.id, formData);
      if (res.success) {
        setPreview(null);
        toast.success("Specialties Updated Successfully");
        router.refresh();
      }
      else{
        toast.error("Failed to update specialties");
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="border border-gray-300 rounded-xl grow w-full p-5 md:p-10 bg-white dark:bg-black min-h-[calc(100vh-64px)]">
      <SectionTitle
        title="Update"
        colorWord="Specialties"
        subtitle="Update an existing specialty. Help patients find the right expert faster."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <label className="block text-sm">Image</label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              className="file:pr-4"
              {...register("image", {
                onChange: (e) => {
                  const file = e.target.files?.[0];
                  if (file) setPreview(URL.createObjectURL(file));
                },
              })}
            />

            {preview ? (
              <Image
                src={preview}
                alt="preview"
                width={100}
                height={100}
                className="object-cover rounded-md border"
              />
            ) : (
              <Image
                src={specialtiesData.icon}
                alt="preview"
                width={100}
                height={100}
                className="object-cover rounded-md border"
              />
            )}
          </div>

          <Button type="submit" className="mt-3 w-full bg-linear-to-r from-purple-500 to-pink-500 py-3">
            {isSubmitting ? "Updating...." : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateSpecialtiesForm;
