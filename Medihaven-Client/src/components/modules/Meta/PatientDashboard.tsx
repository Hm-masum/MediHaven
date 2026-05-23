"use client";

import {
  CalendarCheck,
  FileText,
  Star,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

type AppointmentStatus = {
  status: string;
  count: number;
};

type PatientDashboardData = {
  appointmentCount: number;
  prescriptionCount: number;
  reviewCount: number;
  formattedAppointmentStatusDistribution: AppointmentStatus[];
};

const COLORS = [
  "#8b5cf6",
  "#06b6d4",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

export default function PatientDashboard({
  dashboardData,
}: {
  dashboardData: PatientDashboardData;
}) {
  const stats = [
    {
      title: "Appointments",
      value: dashboardData?.appointmentCount,
      icon: CalendarCheck,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Prescriptions",
      value: dashboardData?.prescriptionCount,
      icon: FileText,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Reviews",
      value: dashboardData?.reviewCount,
      icon: Star,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const activityData = [
    {
      name: "Appointments",
      total: dashboardData?.appointmentCount,
    },
    {
      name: "Prescriptions",
      total: dashboardData?.prescriptionCount,
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
          Patient Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back!. Here’s your health activity overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-2 md:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm dark:bg-black"
            >
              <div
                className={`absolute right-0 top-0 h-24 w-24 rounded-full bg-linear-to-br ${item.color} opacity-10 blur-2xl`}
              />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {item.title}
                  </p>
                  <h2 className="mt-2 text-2xl md:text-3xl font-bold">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${item.color} text-white`}
                >
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Pie Chart */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-black">
          <h2 className="mb-5 text-xl font-semibold">
            Appointment Status
          </h2>
          <div className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={
                    dashboardData?.formattedAppointmentStatusDistribution
                  }
                  dataKey="count"
                  nameKey="status"
                  outerRadius={100}
                  label
                >
                  {dashboardData?.formattedAppointmentStatusDistribution?.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-black">
          <h2 className="mb-5 text-xl font-semibold">
            Activity Overview
          </h2>
          <div className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="total"
                  radius={[10, 10, 0, 0]}
                  fill="#8b5cf6"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}