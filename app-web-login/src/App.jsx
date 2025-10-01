import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "@/Pages/Login.jsx";
import Home from "@/Pages/Home.jsx";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";
import {AuthProvider} from "@/context/AuthContext.jsx";

function App() {

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Home/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
