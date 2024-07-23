import React, { createContext, useContext, useEffect, useState } from 'react';

// Cria o contexto
const AuthContext = createContext(null);

// Provedor do contexto
export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('usuarioLogado'));
        setUsuario(storedUser);
    }, []);

    return (
        <AuthContext.Provider value={{ usuario }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook para usar o contexto
export function useAuth() {
    return useContext(AuthContext);
}

// Função que retorna um componente dependendo do estado do usuário
export function FalseToken() {
    const { usuario } = useAuth();

    return (
        <>
            {usuario ? (
                <p>Usuário está logado</p>
            ) : (
                <p>Usuário não está logado</p>
            )}
        </>
    );
}
