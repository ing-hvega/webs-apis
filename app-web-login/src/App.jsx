import './App.css'
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Login from "@/Pages/Login.jsx";
import Home from "@/Pages/Home.jsx";
import ProtectedBaseRol from "@/components/ProtectedBaseRol.jsx";
import {AuthProvider, useAuth} from "@/context/AuthContext.jsx";
import Dashboard from "@/Pages/Dashboard.jsx";
import Profile from "@/Pages/Profile.jsx";
import Unauthorized from "@/Pages/Unauthorized.jsx";
import Preloader from "@/components/Preloader.jsx";
import Report from "@/Pages/Report.jsx";

function AppContent() {
    const { loading } = useAuth();

    if (loading) {
        return <Preloader />;
    }

    return (
        <Router>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/login" element={<Login/>}/>
                <Route path="/unauthorized" element={<Unauthorized/>}/>

                {/* Rutas protegidas */}
                <Route path="/" element={<ProtectedBaseRol requirePermission="/home"><Home/></ProtectedBaseRol>}/>
                <Route path="/home" element={<ProtectedBaseRol requirePermission="/home"><Home/></ProtectedBaseRol>}/>
                <Route path="/dashboard" element={<ProtectedBaseRol requirePermission="/dashboard"><Dashboard/></ProtectedBaseRol>}/>
                <Route path="/profile" element={<ProtectedBaseRol requirePermission="/profile"><Profile/></ProtectedBaseRol>}/>
                <Route path="/report" element={<ProtectedBaseRol requirePermission="/report"><Report/></ProtectedBaseRol>}/>

                {/* Ruta por defecto - redirecciona a home si no coincide ninguna ruta */}
                <Route path="*" element={<Navigate to="/home" replace />}/>
            </Routes>
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    )
}

export default App
