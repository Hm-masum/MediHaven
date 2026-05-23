"use client";

import {
  CalendarCheck,
  Users,
  Stethoscope,
  CreditCard,
  DollarSign,
  Activity,
} from "lucide-react";

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

type DashboardData = {
  appointmentCount: number;
  patientCount: number;
  doctorCount: number;
  paymentCount: number;
  totalRevenue: number;
};

const COLORS = [
  "#8b5cf6",
  "#06b6d4",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];

export default function AdminDashboard({
  dashboardData,
}: {
  dashboardData: DashboardData;
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
      title: "Doctors",
      value: dashboardData?.doctorCount,
      icon: Stethoscope,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Payments",
      value: dashboardData?.paymentCount,
      icon: CreditCard,
      color: "from-orange-500 to-amber-500",
    },
    {
      title: "Revenue",
      value: dashboardData?.totalRevenue,
      icon: DollarSign,
      color: "from-emerald-500 to-green-500",
    },
  ];

  const chartData = [
    {
      name: "Appointments",
      total: dashboardData?.appointmentCount,
    },
    {
      name: "Patients",
      total: dashboardData?.patientCount,
    },
    {
      name: "Doctors",
      total: dashboardData?.doctorCount,
    },
    {
      name: "Payments",
      total: dashboardData?.paymentCount,
    },
  ];

  const pieData = [
    {
      name: "Appointments",
      value: dashboardData?.appointmentCount,
    },
    {
      name: "Patients",
      value: dashboardData?.patientCount,
    },
    {
      name: "Doctors",
      value: dashboardData?.doctorCount,
    },
    {
      name: "Payments",
      value: dashboardData?.paymentCount,
    },
  ];

  return (
    <div className="space-y-3 md:space-y-8">
      {/* Heading */}
      <div>
        <h1 className="bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back !. Here your service overview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-5 xl:grid-cols-5">
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
                  <p className="text-sm text-muted-foreground">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                    {item.title === "Revenue"
                      ? `৳ ${item.value}`
                      : item.value}
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-2 md:gap-5 lg:grid-cols-2">
        {/* Revenue + Bar Chart */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-black">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Revenue
              </p>
              <h2 className="mt-2 text-2xl font-bold text-green-600 md:text-4xl">
                ৳ {dashboardData?.totalRevenue}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Overall income from completed appointments.
              </p>
            </div>
            <div className="rounded-2xl bg-green-100 p-4 dark:bg-green-900/20">
              <DollarSign
                className="text-green-600"
                size={40}
              />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="mt-6 h-65">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="total"
                  fill="#8b5cf6"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart + Summary */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-black">
          <div className="mb-5 flex items-center gap-2">
            <Activity
              className="text-violet-500"
              size={24}
            />
            <h2 className="text-xl font-semibold">
              System Summary
            </h2>
          </div>

          {/* Pie Chart */}
          <div className="h-65">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Summary List */}
          <div className="mt-5 space-y-3">
            {pieData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl bg-muted/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[index % COLORS.length],
                    }}
                  />

                  <span className="font-medium">
                    {item.name}
                  </span>
                </div>

                <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-600 dark:bg-violet-900/20">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}