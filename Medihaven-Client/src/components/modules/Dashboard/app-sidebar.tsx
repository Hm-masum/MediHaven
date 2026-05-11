"use client";

import * as React from "react";
import {
  Award,
  BookmarkCheck,
  BookText,
  Calendar,
  ChartNoAxesColumnIncreasing,
  Cross,
  LayoutGrid,
  Paperclip,
  Star,
  UserRoundCog,
  UsersRound,
  Wallet,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const NavItems = (role: "ADMIN" | "DOCTOR" | "PATIENT") => {
  if (role === "ADMIN") {
    return [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutGrid,
        isActive: true,
      },
      {
        title: "Doctors",
        url: "/dashboard/admin/doctors",
        icon: Cross,
        isActive: true,
      },
      {
        title: "Patients",
        url: "/dashboard/admin/patients",
        icon: UsersRound,
        isActive: true,
      },
      {
        title: "Appointments",
        url: "/dashboard/admin/appointments",
        icon: BookmarkCheck,
        isActive: true,
      },
      {
        title: "Payments",
        url: "/dashboard/admin/payments",
        icon: Wallet,
        isActive: true,
      },
      {
        title: "Prescription",
        url: "/dashboard/admin/prescriptions",
        icon: BookText,
        isActive: true,
      },
      {
        title: "Reviews",
        url: "/dashboard/admin/reviews",
        icon: Star,
        isActive: true,
      },
      {
        title: "Reports",
        url: "/dashboard/admin/reports",
        icon: Paperclip,
        isActive: true,
      },
      {
        title: "Doctor Schedules",
        url: "/dashboard/admin/doctor-schedules",
        icon: Calendar,
        isActive: true,
      },
      {
        title: "Schedules",
        url: "/dashboard/admin/schedules",
        icon: Calendar,
        isActive: true,
      },
      {
        title: "Specialties",
        url: "/dashboard/admin/specialties",
        icon: Award,
        isActive: true,
      },
    ];
  } else if (role === "DOCTOR") {
    return [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: ChartNoAxesColumnIncreasing,
        isActive: true,
      },
      {
        title: "Appointments",
        url: "/dashboard/doctor/appointments",
        icon: BookmarkCheck,
        isActive: true,
      },
      {
        title: "Schedules",
        url: "/dashboard/doctor/schedules",
        icon: Calendar,
        isActive: true,
      },
      {
        title: "Prescriptions",
        url: "/dashboard/doctor/prescriptions",
        icon: BookText,
        isActive: true,
      },
      {
        title: "Payments",
        url: "/dashboard/doctor/payments",
        icon: Wallet,
        isActive: true,
      },
      {
        title: "Profile",
        url: "#",
        icon: UserRoundCog,
        items: [
          {
            title: "My Profile",
            url: "/dashboard/my-profile",
          },
          {
            title: "Update Profile",
            url: "/dashboard/update-profile",
          }
        ],
      },
    ];
  }else if (role === "PATIENT") {
    return [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: ChartNoAxesColumnIncreasing,
        isActive: true,
      },
      {
        title: "Appointments",
        url: "/dashboard/patient/my-appointment",
        icon: BookmarkCheck,
        isActive: true,
      },
      {
        title: "Payments",
        url: "/dashboard/patient/my-payment",
        icon: Wallet,
        isActive: true,
      },
      {
        title: "Prescription",
        url: "/dashboard/patient/my-prescription",
        icon: BookText,
        isActive: true,
      },
      {
        title: "Profile",
        url: "#",
        icon: UserRoundCog,
        items: [
          {
            title: "My Profile",
            url: "/dashboard/my-profile",
          },
          {
            title: "Update Profile",
            url: "/dashboard/update-profile",
          },
        ],
      },
    ];
  }
};

export function AppSidebar({
  role,
  ...props
}: { role: "ADMIN" | "DOCTOR" | "PATIENT"} & React.ComponentProps<typeof Sidebar>) {
  const navMain = NavItems(role);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="dark:bg-gray-600 flex items-center justify-center"
              asChild
            >
              <Link href="/" className="flex items-center gap-2">
                <Image width={40} height={40} src={logo} alt="" />

                <h2 className="font-semibold md:text-2xl group-data-[collapsible=icon]:hidden">
                  Medi<span className="text-blue-400">Haven</span>
                </h2>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>{navMain && <NavMain items={navMain} />}</SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
