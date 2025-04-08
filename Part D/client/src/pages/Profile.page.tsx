import { useAuth } from "@/context/auth.context";
import AuthGuard from "@/guards/AuthGuard";
import SupplierProfilePage from "./SupplierProfile.page";
import AdminProfilePage from "./AdminProfile.page";

function ProfilePage() {
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  if (user!.role === "admin") {
    return <AdminProfilePage/>
  }
  return <SupplierProfilePage />;
}

export default AuthGuard(ProfilePage);
