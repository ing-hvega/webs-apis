import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "@/Pages/Login.jsx";
import Home from "@/Pages/Home.jsx";
import ProtectedBaseRol from "@/components/ProtectedBaseRol.jsx";
import {AuthProvider} from "@/context/AuthContext.jsx";
import Dashboard from "@/Pages/Dashboard.jsx";
import Profile from "@/Pages/Profile.jsx";
import Unauthorized from "@/Pages/Unauthorized.jsx";

function App() {

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<ProtectedBaseRol requirePermission="/home"><Home/></ProtectedBaseRol>}/>
                    <Route path="/home" element={<ProtectedBaseRol requirePermission="/home"><Home/></ProtectedBaseRol>}/>
                    <Route path="/dashboard" element={<ProtectedBaseRol requirePermission="/dashboard"><Dashboard/></ProtectedBaseRol>}/>
                    <Route path="/profile" element={<ProtectedBaseRol requirePermission="/profile"><Profile/></ProtectedBaseRol>}/>

                    <Route path="/login" element={<Login/>}/>
                    <Route path="/unauthorized" element={<Unauthorized/>}/>

                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
