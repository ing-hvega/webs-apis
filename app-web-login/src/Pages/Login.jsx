import '@/assets/Login/Login.css'
import {useState} from "react";
import {useAuth} from "@/context/AuthContext.jsx";
import {Navigate} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {isAuthenticated, login} = useAuth()

    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!username || !password) {
            alert('Por favor, complete todos los campos')
            return;
        }

        const response = login(username, password)

        if (!response.success) {
            alert(response.message || 'Error al iniciar sesión')
        }
    }

    return (
        <div className='login-container'>
            <div className='login-card'>
                <h2 className='login-title'>Iniciar sesión</h2>

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label className='form-label'>Usuario:</label>
                        <input className='form-input' placeholder='Usuario' type="text" id="username" name="username" required onChange={(e => setUsername(e.target.value))} />
                    </div>

                    <div className='form-group'>
                        <label className='form-label'>Contraseña:</label>
                        <input className='form-input' placeholder='Contraseña' type="password" id="password" name="password" required  onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button className='submit' type='submit'> Iniciar sesión</button>
                </form>

            </div>
        </div>
    )
}

export default Login