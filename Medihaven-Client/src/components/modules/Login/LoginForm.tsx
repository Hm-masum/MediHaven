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
import logo from "../../../assets/logo.png";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@/context/UserContext";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import Link from "next/link";
import { loginUser, forgetPassword } from "@/service/AuthService";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const LoginForm = () => {
  const form = useForm();
  const {
    formState: { isSubmitting },
  } = form;
  const router = useRouter();
  const { setIsLoading, setUser } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const result = await loginUser(data);

      if (result?.success) {
        const decodedUser: any = jwtDecode(result?.data?.accessToken);
        setUser(decodedUser);
        setIsLoading(false);
        router.push("/");
        toast.success(result?.message);
      } else {
        toast.error(result?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  const handleForgetPassword: SubmitHandler<FieldValues> = async (data) => {
    try {
      const result = await forgetPassword(data);
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
    <div className="border shadow max-w-md mx-auto border-gray-300 rounded-xl grow p-5 bg-white dark:bg-gray-800">
      <div className="flex items-center space-x-4 my-5">
        <Image
          width={50}
          height={50}
          src={logo}
          alt=""
          className="dark:shadow-2xl"
        />
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600 dark:text-white">
            Welcome back!
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
            name="password"
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-3 w-full bg-linear-to-r from-purple-500 to-pink-500 py-3 dark:text-white"
          >
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>
      </Form>

      <Dialog>
        <DialogTrigger asChild className="flex justify-end">
          <button className="text-pink-500 my-2">Forget Password?</button>
        </DialogTrigger>
        <DialogContent showCloseButton={false} className="md:w-100">
          <DialogHeader>
            <DialogTitle className="font-normal">
              Please provide your email address :{" "}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleForgetPassword)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="my-4">
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-3 w-full bg-linear-to-r from-purple-500 to-pink-500 py-3 dark:text-white"
              >
                Forget Password
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <p className="text-sm text-gray-600 dark:text-gray-200 text-center my-3">
        Do not have any account?{" "}
        <Link href="/register" className="text-pink-500 font-semibold">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
