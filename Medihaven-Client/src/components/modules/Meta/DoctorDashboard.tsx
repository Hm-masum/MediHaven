"use client";

import { CalendarCheck, Users, Star, DollarSign, Activity } from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

type AppointmentStatus = {
  status: string;
  count: number;
};

type DoctorDashboardData = {
  appointmentCount: number;
  patientCount: number;
  reviewCount: number;
  totalRevenue: number;
  formattedAppointmentStatusDistribution: AppointmentStatus[];
};

const COLORS = ["#8b5cf6", "#06b6d4", "#22c55e", "#f59e0b", "#ef4444"];

export default function DoctorDashboard({
  dashboardData,
}: {
  dashboardData: DoctorDashboardData;
}) {
  const stats = [
    {
      title: "Appointments",
      value: dashboardData?.appointmentCount,
      icon: CalendarCheck,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Patients",
      value: dashboardData?.patientCount,
      icon: Users,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Reviews",
      value: dashboardData?.reviewCount,
      icon: Star,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Revenue",
      value: dashboardData?.totalRevenue,
      icon: DollarSign,
      color: "from-emerald-500 to-green-500",
    },
  ];

  const activityData = [
    {
      name: "Appointments",
      total: dashboardData?.appointmentCount,
    },
    {
      name: "Patients",
      total: dashboardData?.patientCount,
    },
    {
      name: "Reviews",
      total: dashboardData?.reviewCount,
    },
  ];

  return (
    <div className="space-y-3 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Doctor Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back!. Here’s your activity overview.
        </p>
      </div>

      <div className="grid gap-2 md:gap-5 grid-cols-1 md:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-lg dark:bg-black"
            >
              <div
                className={`absolute right-0 top-0 h-24 w-24 rounded-full bg-linear-to-br ${item.color} opacity-10 blur-2xl`}
              />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                  <h2 className="mt-2 text-2xl md:text-3xl font-bold">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${item.color} text-white shadow-lg`}
                >
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-2 md:gap-5 lg:grid-cols-2">
        {/* Revenue Card */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-black">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <h2 className="mt-2 text-2xl font-bold text-green-600 md:text-4xl">
                ৳ {dashboardData?.totalRevenue}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Earnings from completed appointments.
              </p>
            </div>
            <div className="rounded-2xl bg-green-100 p-4 dark:bg-green-900/20">
              <DollarSign size={40} className="text-green-600" />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="mt-6 h-62.5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#8b5cf6" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointment Status */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-black">
          <div className="mb-5 flex items-center gap-2">
            <Activity className="text-violet-500" size={24} />
            <h2 className="text-xl font-semibold">Appointment Status</h2>
          </div>

          {/* Pie Chart */}
          <div className="h-62.5">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboardData?.formattedAppointmentStatusDistribution}
                  dataKey="count"
                  nameKey="status"
                  outerRadius={90}
                  label
                >
                  {dashboardData?.formattedAppointmentStatusDistribution?.map(
                    (_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ),
                  )}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Status List */}
          <div className="mt-5 space-y-3">
            {dashboardData?.formattedAppointmentStatusDistribution?.map(
              (item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl bg-muted/50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />
                    <span className="font-medium">{item.status}</span>
                  </div>
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-600 dark:bg-violet-900/20">
                    {item.count}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
