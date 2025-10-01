import '@/assets/Home/Home.css'
import {useAuth} from "@/context/AuthContext.jsx";

function Home() {
    const {user, logout} = useAuth()

    const handleLogout = () => {
        logout()
    }

    return (
        <div className='home-containers'>
            <h1>Bienvenido, {user?.username}!</h1>
            <p>Has iniciado sesión correctamente.</p>
            <button onClick={handleLogout} className="logout-button">
                Cerrar Sesión
            </button>
        </div>
    )
}

export default Home