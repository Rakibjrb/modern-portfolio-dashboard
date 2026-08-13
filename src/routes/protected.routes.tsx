import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles = [] }: ProtectedRouteProps) => {
    console.log(allowedRoles);

    return <div>{children}</div>;
};

export default ProtectedRoute;