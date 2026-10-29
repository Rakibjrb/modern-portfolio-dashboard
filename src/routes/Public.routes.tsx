import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../redux/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";

interface PublicRouteProps {
    children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    const token = useAppSelector(useCurrentToken);
    const location = useLocation();

    // If user has token, redirect to dashboard or previous target page
    if (token) {
        const from = location.state?.from?.pathname || "/dashboard";
        return <Navigate to={from} replace />;
    }

    return <>{children}</>;
};

export default PublicRoute;