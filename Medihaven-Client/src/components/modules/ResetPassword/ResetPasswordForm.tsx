"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import logo from "../../../assets/logo.png";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/service/AuthService";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("userId");

  const form = useForm();
  const {
    formState: { isSubmitting },
  } = form;
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (!token || !id) {
        toast.error("Invalid reset link");
        return;
      }

      if(data.password !== data.confirmPassword){
        toast.error("Passwords do not match!");
        return;
      }

      const payload = {
        id: id,
        password : data.password
      }

      const result = await resetPassword(payload,token);
     
      if (result?.success) {
        toast.success(result?.message);
        router.push("/login")
      } else {
        toast.error("Something is wrong");
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="border shadow max-w-md mx-auto border-gray-300 rounded-xl flex-grow p-5 bg-white dark:bg-gray-800">
      <div className="flex items-center space-x-4 my-5">
        <Image
          width={50}
          height={50}
          src={logo}
          alt=""
          className="dark:shadow-2xl"
        />
        <div>
          <h1 className="text-xl font-semibold">Reset Password</h1>
          <p className="font-extralight text-sm text-gray-600 dark:text-white">
            Update your password to continue.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-3 w-full bg-blue-700 py-3 dark:text-white"
          >
            {isSubmitting? "Updating..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
