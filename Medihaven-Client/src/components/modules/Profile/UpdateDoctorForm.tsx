"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import SectionTitle from "@/components/shared/SectionTitle";
import { updateMyProfile } from "@/service/UserService";
import { Label } from "@/components/ui/label";
import { IDoctorProfile } from "@/types/doctor";
import { ISpecialties } from "@/types";

export default function UpdateDoctorForm({
  doctorData,
  specialties,
}: {
  doctorData: IDoctorProfile;
  specialties: ISpecialties[];
}) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(doctorData.profilePhoto);

  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    doctorData?.doctorSpecialties?.map((item: any) => item.specialties.id) ||
      [],
  );

  const form = useForm({
    defaultValues: {
      name: doctorData.name || "N/A",
      email: doctorData.email || "N/A",
      profilePhoto: doctorData.profilePhoto,
      contactNumber: doctorData.contactNumber || "N/A",
      address: doctorData.address || "N/A",
      registrationNumber: doctorData.registrationNumber || "N/A",
      experience: doctorData.experience || 0,
      gender: doctorData.gender || "N/A",
      appointmentFee: doctorData.appointmentFee || 0,
      qualification: doctorData.qualification || "N/A",
      currentWorkingPlace: doctorData.currentWorkingPlace || "N/A",
      designation: doctorData.designation || "N/A",

    },
  });

  const {
    register,
    formState: { isSubmitting },
  } = form;

  const handleAddSpecialty = (specialtyId: string) => {
    if (!selectedSpecialties.includes(specialtyId)) {
      setSelectedSpecialties((prev) => [...prev, specialtyId]);
    }
  };

  const handleRemoveSpecialty = (specialtyId: string) => {
    setSelectedSpecialties((prev) => prev.filter((id) => id !== specialtyId));
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const updatedData = {
        ...data,
        doctorSpecialties: selectedSpecialties
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(updatedData));
      if (data.profilePhoto && data.profilePhoto.length > 0) {
        formData.append("file", data.profilePhoto[0]);
      }

      const res = await updateMyProfile(formData);
      if (res.success) {
        toast.success("Doctor Profile Updated Successfully");
        router.refresh();
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="mx-auto min-h-[calc(100vh-64px)] max-w-5xl rounded-xl border bg-white dark:bg-black p-5 md:p-10">
      <SectionTitle
        title="Update"
        colorWord="Doctor Profile"
        subtitle="Update your professional information."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-full border shadow">
              <Image
                src={imagePreview || "/default-profile.png"}
                alt="Doctor"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Name + Email */}
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

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
          </div>

          {/* Contact + Address */}
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Registration + Experience */}
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience (Years)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Gender + Fee */}
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="MALE / FEMALE" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="appointmentFee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Appointment Fee</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Workplace + Designation */}
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="currentWorkingPlace"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Working Place</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Qualification */}
          <FormField
            control={form.control}
            name="qualification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qualification</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Specialties */}
          <div>
            <div className="space-y-3">
              <label className="text-sm font-medium">Doctor Specialties</label>
              <Select onValueChange={handleAddSpecialty} >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select specialties" />
                </SelectTrigger>

                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty.id} value={specialty.id}>
                      {specialty.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Selected Specialties */}
              <div className="flex flex-wrap gap-2">
                {selectedSpecialties.map((specialtyId) => {
                  const specialty = specialties.find(
                    (item) => item.id === specialtyId,
                  );

                  return (
                    <Badge
                      key={specialtyId}
                      className="cursor-pointer px-3 py-2"
                      onClick={() => handleRemoveSpecialty(specialtyId)}
                    >
                      {specialty?.title} ✕
                    </Badge>
                  );
                })}
              </div>

              <p className="text-xs text-muted-foreground">
                Click on a selected specialty to remove it.
              </p>
            </div>
          </div>

          {/* Profile Photo */}
          <div>
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

          <Button type="submit" disabled={isSubmitting} className="bg-linear-to-r from-purple-500 to-pink-500">
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
