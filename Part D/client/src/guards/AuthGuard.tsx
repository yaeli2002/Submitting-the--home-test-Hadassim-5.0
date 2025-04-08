import { useAuth } from "@/context/auth.context";
import { FunctionComponent } from "react";
import { Link } from "react-router";

export default function AuthGuard<T extends object>(Component: FunctionComponent<T>) {
  return function WrappedComponent(props: T) {
    const { token } = useAuth();
    if (!token) {
      return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">You need to be logged in to access this page.</p>
          <Link to="/login" className="text-blue-500 hover:underline">
            Go to Login
          </Link>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
