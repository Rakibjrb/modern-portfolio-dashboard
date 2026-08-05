import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import Login from "../pages/public/Login";
import SignUp from "../pages/public/SignUp";
import Unauthorized from "../pages/public/Unauthorized";
import NotFoundPage from "../pages/public/NotFoundPage";
import ProtectedRoute from "./protected.routes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />,
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute allowedRoles={["super_admin",]}>
                <App />
            </ProtectedRoute>
        ),

        //protected dashboard routes here
        children: [
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },

    {
        path: "/signup",
        element: <SignUp />,
    },

    // unauthorized page
    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },

    // not found page
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

export default router;