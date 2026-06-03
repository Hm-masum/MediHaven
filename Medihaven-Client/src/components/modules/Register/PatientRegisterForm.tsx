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
import { registerPatient } from "@/service/UserService";

const PatientRegisterForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const form = useForm();
  const {
    register,
    formState: { isSubmitting },
  } = form;

  const router = useRouter();
  const { setIsLoading } = useUser();

  const patientOnSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const patientData = {
        patient: {
          name: data.name,
          email: data.email,
          contactNumber: data.contactNumber,
          address: data.address,
        },
        password: data.password,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(patientData));
      formData.append("file", data.image[0]);

      setIsLoading(true);
      const result = await registerPatient(formData);

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
          onSubmit={form.handleSubmit(patientOnSubmit)}
          className="space-y-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input type="text" {...field} value={field.value || ""} />
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
                  <Input type="text" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
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

export default PatientRegisterForm;
