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
import SectionTitle from "@/components/shared/SectionTitle";
import { Label } from "@/components/ui/label";
import { IPatient } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { updatePatientById } from "@/service/PatientService";

export default function UpdatePatientByAdminForm({
  patientData,
}: {
  patientData: IPatient;
}) {
  const router = useRouter();
  const [imagePreview] = useState(patientData.profilePhoto);

  const form = useForm({
    defaultValues: {
      name: patientData.name || "N/A",
      email: patientData.email || "N/A",
      profilePhoto: patientData.profilePhoto,
      contactNumber: patientData.contactNumber || "N/A",
      address: patientData.address || "N/A",

      patientHealthData: {
        dateOfBirth: patientData?.patientHealthData?.dateOfBirth || "",
        gender: patientData?.patientHealthData?.gender || "",
        bloodGroup: patientData?.patientHealthData?.bloodGroup || "",
        height: patientData?.patientHealthData?.height || "",
        weight: patientData?.patientHealthData?.weight || "",
        maritalStatus: patientData?.patientHealthData?.maritalStatus || "",
        dietaryPreferences:
          patientData?.patientHealthData?.dietaryPreferences || "",
        mentalHealthHistory:
          patientData?.patientHealthData?.mentalHealthHistory || "",
        immunizationStatus:
          patientData?.patientHealthData?.immunizationStatus || "",
        hasPastSurgeries:
          patientData?.patientHealthData?.hasPastSurgeries ?? false,
        hasAllergies: patientData?.patientHealthData?.hasAllergies ?? false,
        hasDiabetes: patientData?.patientHealthData?.hasDiabetes ?? false,
        smokingStatus: patientData?.patientHealthData?.smokingStatus ?? false,
        pregnancyStatus:
          patientData?.patientHealthData?.pregnancyStatus ?? false,
        recentAnxiety: patientData?.patientHealthData?.recentAnxiety ?? false,
        recentDepression:
          patientData?.patientHealthData?.recentDepression ?? false,
      },

      medicalReport: {
        reportName: "",
        reportLink: "",
      },
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
      if (
        !data.medicalReport?.reportName?.trim() &&
        !data.medicalReport?.reportLink?.trim()
      ) {
        delete updatedData.medicalReport;
      }

      const res = await updatePatientById(patientData.id, updatedData);

      if (res.success) {
        toast.success("Patient Profile Updated Successfully");
        router.refresh();
      } else {
        toast.error("Failed to update patient profile");
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="mx-auto min-h-[calc(100vh-64px)] max-w-5xl rounded-xl border bg-white dark:bg-black p-5 md:p-10">
      <SectionTitle
        title="Update"
        colorWord="Patient Profile"
        subtitle="Update your professional information."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-full border shadow">
              <Image
                src={imagePreview || "/default-profile.png"}
                alt="Patient"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {/* Full Name */}
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

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
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

            {/* DOB */}
            <FormField
              control={form.control}
              name="patientHealthData.dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="YYYY-MM-DD" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="patientHealthData.gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MALE">MALE</SelectItem>
                      <SelectItem value="FEMALE">FEMALE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Blood Group */}
            <FormField
              control={form.control}
              name="patientHealthData.bloodGroup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Group</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="A_POSITIVE">A_POSITIVE</SelectItem>
                      <SelectItem value="A_NEGATIVE">A_NEGATIVE</SelectItem>
                      <SelectItem value="B_POSITIVE">B_POSITIVE</SelectItem>
                      <SelectItem value="B_NEGATIVE">B_NEGATIVE</SelectItem>
                      <SelectItem value="AB_POSITIVE">AB_POSITIVE</SelectItem>
                      <SelectItem value="AB_NEGATIVE">AB_NEGATIVE</SelectItem>
                      <SelectItem value="O_POSITIVE">O_POSITIVE</SelectItem>
                      <SelectItem value="O_NEGATIVE">O_NEGATIVE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Height */}
            <FormField
              control={form.control}
              name="patientHealthData.height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="5.8 ft" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Weight */}
            <FormField
              control={form.control}
              name="patientHealthData.weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="70kg" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Marital Status */}
            <FormField
              control={form.control}
              name="patientHealthData.maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MARRIED">MARRIED</SelectItem>
                      <SelectItem value="UNMARRIED">UNMARRIED</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dietary Preferences */}
            <FormField
              control={form.control}
              name="patientHealthData.dietaryPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dietary Preferences</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mental Health */}
            <FormField
              control={form.control}
              name="patientHealthData.mentalHealthHistory"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-3">
                  <FormLabel>Mental Health History</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Immunization */}
            <FormField
              control={form.control}
              name="patientHealthData.immunizationStatus"
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-3">
                  <FormLabel>Immunization Status</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {[
              {
                name: "patientHealthData.hasAllergies",
                label: "Has Allergies",
              },
              { name: "patientHealthData.hasDiabetes", label: "Has Diabetes" },
              {
                name: "patientHealthData.smokingStatus",
                label: "Smoking Status",
              },
              {
                name: "patientHealthData.pregnancyStatus",
                label: "Pregnancy Status",
              },
              {
                name: "patientHealthData.hasPastSurgeries",
                label: "Past Surgeries",
              },
              {
                name: "patientHealthData.recentAnxiety",
                label: "Recent Anxiety",
              },
              {
                name: "patientHealthData.recentDepression",
                label: "Recent Depression",
              },
            ].map((item) => (
              <FormField
                key={item.name}
                control={form.control}
                name={item.name as any}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{item.label}</FormLabel>
                    </div>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}

            {/* Medical Report */}
            <FormField
              control={form.control}
              name="medicalReport.reportName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical Report</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Report Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medicalReport.reportLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical Report Link</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Report Link" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-linear-to-r from-purple-500 to-pink-500"
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
