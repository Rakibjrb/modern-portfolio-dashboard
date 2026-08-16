import type { ReactNode } from "react";
import { Navigate } from 'react-router';
import { useAppSelector } from '../redux/hooks';
import { useCurrentToken } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles = [] }: ProtectedRouteProps) => {
    const token = useAppSelector(useCurrentToken);

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Verify token and get user info
    let decodedUser = null;
    try {
        decodedUser = verifyToken(token);
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        // Token is invalid, redirect to login
        return <Navigate to="/login" replace />;
    }

    // If token is expired, redirect to login
    if (decodedUser && decodedUser.exp && decodedUser.exp < Date.now() / 1000) {
        return <Navigate to="/login" replace />;
    }

    // If roles are specified and user doesn't have required role, redirect to unauthorized
    if (allowedRoles.length > 0 && decodedUser) {
        const userRole = decodedUser.role || decodedUser.platformRole;
        if (!allowedRoles.includes(userRole)) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;