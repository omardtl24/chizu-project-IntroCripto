"use client";

import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../context/authContext";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useAuth();
    // Validar el contenido de las rutas, ejemplo si tiene acceso a x panel
    if (!user) {
        return <Navigate to="/" />;
    }
    return <>{children}</>;
}

export default ProtectedRoute;
