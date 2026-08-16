import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import Login from "../pages/public/Login";
import Unauthorized from "../pages/public/Unauthorized";
import NotFoundPage from "../pages/public/NotFoundPage";
import ProtectedRoute from "./protected.routes";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProjectsPage from "../pages/dashboard/ProjectsPage/ProjectsPage";
import ExperiencesPage from "../pages/dashboard/ExperiencesPage/ExperiencesPage";
import ContactsPage from "../pages/dashboard/ContactsPage/ContactsPage";
import PublicRoute from "./Public.routes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />,
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute allowedRoles={["super_admin",]}>
                <App />
            </ProtectedRoute>
        ),

        //protected dashboard routes here
        children: [
            {
                path: "/dashboard",
                element: <DashboardPage />,
            },
            {
                path: "/dashboard/projects",
                element: <ProjectsPage />,
            },
            {
                path: "/dashboard/experiences",
                element: <ExperiencesPage />,
            },
            {
                path: "/dashboard/contacts",
                element: <ContactsPage />,
            },
        ],
    },
    {
        path: "/login",
        element: <PublicRoute>
            <Login />
        </PublicRoute>,
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