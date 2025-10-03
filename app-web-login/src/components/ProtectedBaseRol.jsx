import {useAuth} from "@/context/AuthContext.jsx";
import {Navigate} from "react-router-dom";


function ProtectedBaseRol({children, allowedRoles = [], requirePermission = null}) {
    const {isAuthenticated, hasAnyRole, hasPermission} = useAuth()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    // roles permitidos
    if (allowedRoles.length > 0 && !hasAnyRole(allowedRoles)) {
        return <Navigate to="/unauthorized" replace/>;
    }

    // un permisos requerido
    if (requirePermission && !hasPermission(requirePermission)) {
        return <Navigate to="/unauthorized" replace/>;
    }

    return children
}

export default ProtectedBaseRol