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
    {id: 1, username: 'admin', password: '123', name: 'Administrador', role: 'admin'},
    {id: 2, username: 'moderador', password: '123', name: 'Moderado', role: 'moderador'},
    {id: 3, username: 'user', password: '123', name: 'Usuario Regular', role: 'user'},
]

const ROLE_PERMISSIONS = {
    admin: [
        '/dashboard',
        '/home',
        '/profile'
    ],
    moderador: [
        '/dashboard',
        '/home',
        '/profile'
    ],
    user: [
        '/home',
        '/profile'
    ],
}

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
                role: foundUser.role,
            }

            setUser(userData);
            localStorage.setItem('authUser', JSON.stringify(userData));
            setLoading(false);

            return {success: true, user: userData};
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

    const hasPermission = (path) => {

       if (!user || !user.role) {
            return false
        }

        const userPermissions = ROLE_PERMISSIONS[user.role] || [];

        return userPermissions.includes(path);
    }

    const hasRole = (role) => {
        return user?.role === role;
    }

    const hasAnyRole = (roles) => {
        return roles.includes(user?.role);
    }

    const value = {
        user,
        isAuthenticated,
        loading,
        logout,
        login,
        hasPermission,
        hasRole,
        hasAnyRole,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}