import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }

    return context;
};

const USERS_FAKE = [
    {id: 1, username: 'user1', password: 'user1', name: 'Administrador'},
    {id: 2, username: 'user2', password: 'user2', name: 'Cliente'},
]

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('authUser');

        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);

                setUser(parsedUser)
            } catch (error) {
                console.log("Error al cargar el usuario guardado:", error.message);
                localStorage.removeItem('authUser');
            }
        }

        setLoading(false);
    }, []);

    const login = (username, password) => {
        setLoading(true)

        const foundUser = USERS_FAKE.find(user => user.username === username && user.password === password);

        if (foundUser) {
            const userData = {
                id: foundUser.id,
                username: foundUser.username,
                name: foundUser.name,
            }

            setUser(userData);
            localStorage.setItem('authUser', JSON.stringify(userData));
            setLoading(false);

            return { success: true, user: userData };
        } else {
            setLoading(false);
            return {success: false, message: 'Credenciales incorrectas'}
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authUser');
    }

    const isAuthenticated = !!user;

    const value = {
        user,
        isAuthenticated,
        loading,
        logout,
        login,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}