import UpdateAdminForm from "@/components/modules/Profile/UpdateAdminForm";
import { getMe } from "@/service/UserService";

const UpdateAdminPage = async() => {
        const { data: adminData } = await getMe()
    return (
        <div>
            <UpdateAdminForm adminData={adminData} />
        </div>
    );
};

export default UpdateAdminPage;