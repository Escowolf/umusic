import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);
    const [currentMusic, setCurrentMusic] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica se há um token armazenado no localStorage
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            // Decodifica o token para recuperar o usuário
            const payload = JSON.parse(atob(storedToken));
            setToken(storedToken);
            setCurrentUser(payload.usuario);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (usuario) => {
        // Gera um token falso com uma função simples
        const payload = { usuario };
        const token = btoa(JSON.stringify(payload)); // Gera um token base64 (não seguro)

        setIsAuthenticated(true);
        setCurrentUser(usuario);
        setToken(token);
        localStorage.setItem('token', token);
        navigate('/home');
    };

    const logout = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setToken(null);
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, token, currentMusic, setCurrentMusic }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}