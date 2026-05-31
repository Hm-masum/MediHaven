"use client";

import { useState } from "react";
import Image from "next/image";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateMyProfile } from "@/service/UserService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SectionTitle from "@/components/shared/SectionTitle";
import { IAdminProfile } from "@/types/admin";

export default function UpdateAdminForm({
  adminData,
}: {
  adminData: IAdminProfile;
}) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(adminData.profilePhoto);

  const form = useForm({
    defaultValues: {
      name: adminData.name,
      email: adminData.email,
      contactNumber: adminData.contactNumber,
      profilePhoto: adminData.profilePhoto,
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
      if (data.profilePhoto && data.profilePhoto.length > 0) {
        formData.append("file", data.profilePhoto[0]);
      }

      const res = await updateMyProfile(formData);
      if (res.success) {
        toast.success("Admin Profile Updated Successfully");
        router.refresh();
      } else {
        toast.error("Failed to update admin profile");
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto border border-gray-300 rounded-xl grow p-5 md:p-10 dark:bg-black bg-white min-h-[calc(100vh-64px)]">
      <SectionTitle
        title="Update"
        colorWord="Profile"
        subtitle="Update an existing profile. Make sure to fill out all the required fields."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-center">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border shadow">
              <Image
                src={imagePreview || "/default-profile.png"}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              disabled
              readOnly
              className="cursor-not-allowed bg-muted"
              {...register("email")}
            />
          </div>

          {/* Contact */}
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Contact Number</FormLabel>
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
              id="profilePhoto"
              type="file"
              accept="image/*"
              className="file:pr-4"
              {...register("profilePhoto", {
                onChange: (e) => {
                  const file = e.target.files?.[0];
                  if (file) setImagePreview(URL.createObjectURL(file));
                },
              })}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="bg-linear-to-r from-purple-500 to-pink-500" >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
