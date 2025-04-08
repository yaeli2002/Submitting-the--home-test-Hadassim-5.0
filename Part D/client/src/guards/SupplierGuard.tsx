import { useAuth } from "@/context/auth.context";
import { FunctionComponent } from "react";
import { Link } from "react-router";

export default function SupplierGuard<T extends object>(Component: FunctionComponent<T>) {
  return function WrappedComponent(props: T) {
    const { user } = useAuth();

    if (user?.role !== "supplier") {
      return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">You have insufficient permissions to access this page.</p>
          <Link to="/home" className="text-blue-500 hover:underline">
            Go to Home
          </Link>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
