import { useAuth } from "@/context/auth.context";
import { FunctionComponent } from "react";
import { Navigate } from "react-router";

export default function AlreadyLoggedInGuard<T extends object>(Component: FunctionComponent<T>) {
  return function WrappedComponent(props: T) {
    const { token } = useAuth();
    if (!token) {
      return <Component {...props} />;
    }

    return <Navigate to="/home" />;
  };
}
