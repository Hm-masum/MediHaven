
import AdminProfile from "@/components/modules/Profile/AdminProfile";
import { getMe } from "@/service/UserService";

const AdminProfilePage = async() => {
    const { data: admin } = await getMe()
    return (
        <div>
            <AdminProfile admin={admin}/>
        </div>
    );
};

export default AdminProfilePage;