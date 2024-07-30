import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [currentMusic, setCurrentMusic] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const login = (usuario) => {
        // Gera um token falso com uma função simples 
        const payload = { usuario };
        const token = btoa(JSON.stringify(payload)); // Gera um token base64 (não seguro)

        setIsAuthenticated(true);
        setToken(token);
        console.log(token);
        localStorage.setItem('token', token);
        navigate('/home');
    };

    const logout = () => {
        setIsAuthenticated(false);
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, token, currentMusic, setCurrentMusic }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

// Função que retorna um componente dependendo do estado do usuário
export function AuthStatus() {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {isAuthenticated ? (
                <p>Usuário está logado</p>
            ) : (
                <p>Usuário não está logado</p>
            )}
        </>
    );
}
