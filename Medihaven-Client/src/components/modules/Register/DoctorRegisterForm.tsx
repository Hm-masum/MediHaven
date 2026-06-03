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
import Image from "next/image";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerDoctor } from "@/service/UserService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DoctorRegisterForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const form = useForm();
  const {
    register,
    formState: { isSubmitting },
  } = form;

  const router = useRouter();
  const { setIsLoading } = useUser();

  const doctorOnSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const doctorData = {
        password: data.password,
        doctor: {
          name: data.name,
          email: data.email,
          contactNumber: data.contactNumber,
          address: data.address,
          registrationNumber: data.registrationNumber,
          experience: Number(data.experience),
          gender: data.gender,
          appointmentFee: Number(data.appointmentFee),
          qualification: data.qualification,
          currentWorkingPlace: data.currentWorkingPlace,
          designation: data.designation,
        },
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(doctorData));
      formData.append("file", data.image[0]);

      setIsLoading(true);
      const result = await registerDoctor(formData);

      if (result?.success) {
        setPreview(null);
        setIsLoading(false);
        router.push("/login");
        toast.success(result?.message);
      } else {
        toast.error(result?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(doctorOnSubmit)}
          className="space-y-3"
        >
          <div className="flex flex-col md:flex-row items-center gap-3 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name"
                      type="text"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email"
                      type="email"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 w-full">
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="contact number"
                      type="text"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="address"
                      type="text"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 w-full">
            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Registration Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="registration number"
                      type="text"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example: 5"
                      type="text"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 w-full">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
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

            <FormField
              control={form.control}
              name="appointmentFee"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Appointment Fee</FormLabel>
                  <FormControl>
                    <Input placeholder="example: 100" type="number" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 w-full">
            <FormField
              control={form.control}
              name="qualification"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Qualification</FormLabel>
                  <FormControl>
                    <Input placeholder="example: MBBS, MD" type="text" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentWorkingPlace"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Current Working Place</FormLabel>
                  <FormControl>
                    <Input placeholder="example: City Hospital" type="text" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3 w-full">
            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="example: Professor" type="text" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm">Image</label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              className="file:pr-4 "
              {...register("image")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />

            {preview && (
              <Image
                src={preview}
                alt="preview"
                width={100}
                height={100}
                className="object-cover rounded-md border"
              />
            )}
          </div>

          <Button
            type="submit"
            className="mt-3 w-full bg-linear-to-r from-purple-500 to-pink-500 py-3 dark:text-white"
          >
            {isSubmitting ? "Registering...." : "Register"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DoctorRegisterForm;
