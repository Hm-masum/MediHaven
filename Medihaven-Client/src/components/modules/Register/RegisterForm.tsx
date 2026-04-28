"use client";

import Image from "next/image";
import logo from "../../../assets/logo.png";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientRegisterForm from "./PatientRegisterForm";
import DoctorRegisterForm from "./DoctorRegisterForm";
import AdminRegisterForm from "./AdminRegisterForm";

const RegisterForm = () => {
  return (
    <div className="border shadow max-w-3xl  mx-auto border-gray-300 rounded-xl grow p-5 bg-white dark:bg-gray-800">
      <div className="flex items-center space-x-4 my-5">
        <Image
          width={50}
          height={50}
          src={logo}
          alt=""
          className="dark:shadow-2xl"
        />
        <div>
          <h1 className="text-xl font-semibold">Register!</h1>
          <p className="font-extralight text-sm text-gray-600 dark:text-white">
            Join us today and start your journey!
          </p>
        </div>
      </div>

      <Tabs defaultValue="patient" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="patient">Patient</TabsTrigger>
          <TabsTrigger value="doctor">Doctor</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>

        {/* Patient Form */}
        <TabsContent value="patient">
          <PatientRegisterForm/>
        </TabsContent>

        {/* Doctor Form */}
        <TabsContent value="doctor">
          <DoctorRegisterForm/>
        </TabsContent>

        {/* Patient Form */}
        <TabsContent value="admin">
          <AdminRegisterForm/>
        </TabsContent>
      </Tabs>

      <p className="text-sm text-gray-600 dark:text-gray-200 text-center my-3">
        Already have an account ?{" "}
        <Link href="/login" className="text-blue-500 font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
