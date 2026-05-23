import AdminDashboard from "@/components/modules/Meta/AdminDashboard";
import DoctorDashboard from "@/components/modules/Meta/DoctorDashboard";
import PatientDashboard from "@/components/modules/Meta/PatientDashboard";
import { fetchDashboardMetaData } from "@/service/MetaService";
import { getMe } from "@/service/UserService";

const DashboardPage = async () => {
  const { data: dashboardData } = await fetchDashboardMetaData();
  const { data: user } = await getMe();
  return (
    <div>
      {user?.role === "ADMIN" && (
        <AdminDashboard dashboardData={dashboardData} />
      )}

      {user?.role === "DOCTOR" && (
        <DoctorDashboard dashboardData={dashboardData} />
      )}

      {user?.role === "PATIENT" && (
        <PatientDashboard dashboardData={dashboardData} />
      )}
    </div>
  );
};

export default DashboardPage;
